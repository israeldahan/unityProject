import CustomerDetails from "./CustomerDetails";

const customersData = (params) => {
  const { data } = params;
  if (data instanceof Array) {
    return (
      <div>
        <h2>Customer Data</h2>
        {data.length === 0 && <p>No data found</p>}
        {data.length > 0 &&
          data.map((data, key) => {
            return <CustomerDetails key={key} data={data} />;
          })}
      </div>
    );
  }
  return (
    <div>
      <h2>Customer Data</h2>
      <CustomerDetails data={data} />
    </div>
  );
};

export default customersData;
