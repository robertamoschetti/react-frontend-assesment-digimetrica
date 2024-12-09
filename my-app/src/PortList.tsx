function PortList({ n_port }: { n_port: { [port: string]: { n: number } } }) {
  return (
    <ul>
      {Object.entries(n_port).map(([port, details]) => (
        <li key={port}>
          Porta {port}: {details.n} esposizioni
        </li>
      ))}
    </ul>
  );
}

export default PortList;
