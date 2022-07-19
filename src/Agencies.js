import { gql, useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const GET_AGENCIES = gql`
  query GetAgencies {
    allAgencies {
      identity
      name
      logoUrl
      address
    }
  }
`;
const CREATE_AGENCY = gql`
  mutation CreateAgency($agencyName: String!) {
    createAgency(name: $agencyName) {
      identity
      name
      logoUrl
      address
    }
  }
`
const DELETE_AGENCY = gql`
  mutation DeleteAgency($agencyIdentity: ID!) {
    deleteAgency(identity: $agencyIdentity)
  }
`;

export default function Agencies() {
  const [ allAgencies, setAllAgencies ] = useState([]);
  const { data, loading ,error } = useQuery(GET_AGENCIES);
  const [_createAgency, createAgencyResponse] = useMutation(CREATE_AGENCY);
  const [_deleteAgency, deleteAgencyResponse] = useMutation(DELETE_AGENCY);
  const createAgency = () => {
    const agencyName = `agency ${Math.floor(Math.random() * 100)}`;
    _createAgency({ variables: { agencyName } });
  }
  const deleteAgency = (evt) => {
    const agencyIdentity = evt.target.value;
    _deleteAgency({ variables: { agencyIdentity } });
    const newAllAgencies = allAgencies.filter((agency) => agency.identity !== agencyIdentity);
    setAllAgencies(newAllAgencies);
  }
  useEffect(() => {
    if (data) {
      const allAgencies = data.allAgencies.slice();
      setAllAgencies(allAgencies);
    }
  }, [data])

  useEffect(() => {
    if (createAgencyResponse.data) {
      const agency = createAgencyResponse.data.createAgency;
      setAllAgencies([...allAgencies, agency]);
      createAgencyResponse.reset();
    }
  }, [createAgencyResponse?.data?.createAgency])

  if (loading) {
    return <h1> Fetching...</h1>
  }
  if (error) {
    console.error(error);
    return <h1> Failed to fetch </h1>
  }
  return (
    <div>
      <h1> Agencies </h1>
      {
        allAgencies.map((agency) => {
          return (
            <div className='agency' key={agency.identity}>
              <div className='logo'>
                <img src={agency.logoUrl} alt={agency.logoUrl} />
              </div>
              <div className='name'>
                <Link to={`/agencies/${agency.identity}`}>
                  {agency.name}
                </Link>
              </div>
              <div className='address'>
                {agency.address}
              </div>
              <div className='remove'>
                <button value={agency.identity} className='btn btn-danger' onClick={deleteAgency}> Remove </button>
              </div>
            </div>
          );
        })
      }
      <div className='text-end'>
        <button className='btn btn-primary' onClick={createAgency}> Create a new agency </button>
      </div>
    </div>
  );
}