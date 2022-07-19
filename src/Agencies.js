import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_AGENCIES = gql`
  query getAgencies {
    allAgencies {
      identity
      name
      logoUrl
      address
    }
  }
`;

export default function Agencies() {
  const { data, loading ,error } = useQuery(GET_AGENCIES);
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
        data.allAgencies.map((agency) => {
          return (
            <div key={agency.identity}>
              <div>
                <img src={agency.logoUrl} />
              </div>
              <div>
                <Link to={`/agencies/${agency.identity}`}>
                  {agency.name}
                </Link>
              </div>
              <div>{agency.address}</div>
            </div>
          );
        })
      }
    </div>
  );
}