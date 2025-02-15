import { Row, Table } from 'react-bootstrap';

export interface BotCommand {
  readonly command: string;
  readonly description: string;
}

interface CommandProps {
  commands: {
    command: string;
    description: string;
  }[];
}

const CommandTable: React.FC<CommandProps> = ({ commands }) => {
  let index = 0;
  const CommandData = commands.map((command: BotCommand) => {
    return (
      <tr key={++index}>
        <td>!{command.command}</td>
        <td>{command.description}</td>
      </tr>
    );
  });

  return (
    <Row mt-5='true' mb-5='true'>
      <Table striped>
        <thead>
          <tr>
            <th>Command</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{CommandData}</tbody>
      </Table>
    </Row>
  );
};

export default CommandTable;
