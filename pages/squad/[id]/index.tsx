import Image from "next/image";
import Link from "next/link";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PlayersClient, { Player } from "../../../clients/PlayersClient";

const Squad = () => {

  return (<div></div>)
  // return (
  //   <div>
  //     <TableContainer component={Paper}>
  //       <Table>
  //         <TableHead>
  //           <TableRow style={{background: "lightgray"}}>
  //             <TableCell></TableCell>
  //             <TableCell>Name</TableCell>
  //             <TableCell>Date of Birth</TableCell>
  //             <TableCell>Position</TableCell>
  //             <TableCell>Nationality</TableCell>
  //             <TableCell></TableCell>
  //           </TableRow>
  //         </TableHead>
  //         <TableBody>
  //           {squad && squad.map((player: Player) => (
  //             <TableRow
  //               key={player.id}
  //             >
  //               <TableCell>
  //                 <Image src={player.photo} width="50" height="50"/>
  //               </TableCell>
  //               <TableCell>{player.name}</TableCell>
  //               <TableCell>{player.birth.date}</TableCell>
  //               <TableCell>{player.position}</TableCell>
  //               <TableCell>{player.nationality}</TableCell>
  //               <TableCell>
  //                 <Link href="/player/[id]" as={`/player/${league}-${season}-${team}-${player.id}`}>
  //                   <Button size="small">Statistics</Button>
  //                 </Link>
  //               </TableCell>
  //             </TableRow>
  //           ))}
  //         </TableBody>
  //       </Table>
  //     </TableContainer>
  //   </div>
  //   )
}

export default Squad;

// export async function getServerSideProps(context: any) {
//   const params = context.params.id.split("-");

//   const league = params[0];
//   const season = params[1];
//   const team = params[2];

//   const client = new PlayersClient(undefined);

//   const squad = await client.getPlayersAsync(league, season, team);

//   return {
//     props: {
//       squad,
//       league,
//       season,
//       team
//     }
//   }
// }