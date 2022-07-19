import { useQuery, gql } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

const GET_AGENCY = gql`
  query getAgency($identity: ID!) {
    singleAgency(identity: $identity) {
      identity
      name
      logoUrl
      address
    }
  }
`;
export default function Agency() {
  const { id } = useParams();
  const [ agency, setAgency ] = useState({});
  const { data, loading, error, client } = useQuery(GET_AGENCY, {
    variables: {
      identity: id,
    }
  });
  useEffect(() => {
    if (data) {
      const agency = data.singleAgency;
      setAgency(agency);
    }
  }, [data]);

  if (loading) {
    return <h1> Fetching... </h1>
  }
  if (error) {
    return <h1> Failed to fetch </h1>
  }
  return (
    <div>
      <div className='agency' key={agency.identity}>
        <div className='logo'>
          <img src={agency.logoUrl} alt={agency.logoUrl} />
        </div>
        <div className='name'>
          {agency.name}
        </div>
        <div className='address'>
          {agency.address}
        </div>
      </div>
      <div className='text-end'>
        <Link className='btn btn-primary' to='/'>Go Back</Link>
      </div>
    </div>
  );
}