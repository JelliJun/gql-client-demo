import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
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
  const { data, loading, error } = useQuery(GET_AGENCY, {
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
    <div key={agency.identity}>
      <div>
        <img src={agency.logoUrl} />
      </div>
      <div>
        {agency.name}
      </div>
      <div>{agency.address}</div>
    </div>
  );
}