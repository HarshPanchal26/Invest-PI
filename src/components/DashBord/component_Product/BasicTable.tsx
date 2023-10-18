import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

type TypeForInvestorObj = {
  dataofInvestor: any,
  setDataForInvestors ?: React.Dispatch<React.SetStateAction<any>>
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function BasicTable({ dataofInvestor, setDataForInvestors }: TypeForInvestorObj) {

  const [dataForInvestorsProfile, setDatForInvestorsProfile] = React.useState<Array<any> | null>(null);

  const navigate = useNavigate();

  const fetchInvestorProfile = async () => {
    let arrayOFId: Array<any> = [];
    dataofInvestor.map((item: any) => {
      arrayOFId.push(...item.allInvestor)
      arrayOFId.push(...item.leadInvestors)
    })
    console.log("arrayOFId", arrayOFId)

    try {
      const res = await axios.post('/api/profile/view', { array: arrayOFId, field: '_id' });
      console.log(res);
      setDatForInvestorsProfile(res.data.profiles)
    } catch (error) {
      console.log(error)
    }
  }


  React.useEffect(() => {
    console.log("dataofInvestor", dataofInvestor)
    fetchInvestorProfile()
  }, [])

  React.useEffect(() => {
    console.log('dataForInvestorsProfile', dataForInvestorsProfile);
  }, [dataForInvestorsProfile])

  const findUserThroughId = (id: string) => {
    if (dataForInvestorsProfile) {
      const firstChild = dataForInvestorsProfile.filter((item) => {
        return item._id === id
      })
      return firstChild[0];
    }
  }


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className='text-2xl'>
            <TableCell><b>Lead Investors</b></TableCell>
            <TableCell align="right"><b>Type</b></TableCell>
            <TableCell align="right"><b>Amount</b></TableCell>
            <TableCell align="right"><b>Total Investor</b></TableCell>
            <TableCell align="right"><b>Date</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataofInvestor.map((item: any, index: number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope='row'>
                {dataForInvestorsProfile !== null && (
                  <div className='flex flex-row flex-wrap w-[300px] h-full'>
                    {
                      item.leadInvestors.map((item: any) => {
                        let Obj: any = findUserThroughId(item)
                        return (
                          <div className='flex flex-row cursor-pointer'>
                            <Avatar alt="Remy Sharp"
                              src={Obj.profileImage}
                              sx={{ width: 40, height: 40 }}
                              className='my-2 mx-2'
                            />
                            <div className="min-w-0 flex-grow my-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900 hover:border-b"
                              onClick={()=>navigate(`/profile/${Obj.username}`)}
                              >{Obj.name}</p>
                              <p className="text-sm font-semibold leading-6 text-gray-900 hover:border-b"
                              onClick={()=>navigate(`/profile/${Obj.username}`)}
                              >{Obj.username}</p>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>)
                }
                {
                  dataForInvestorsProfile === null &&
                  <>
                    <div className='flex flex-row flex-wrap w-[300px] h-full gap-4'>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={140} />
                    </div>
                    <div className='flex flex-row flex-wrap w-[300px] h-full gap-4'>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={140} />
                    </div>
                  </>
                }
              </TableCell>
              <TableCell align="right">{item.typeOfInvestment}</TableCell>
              <TableCell align="right">${item.raisedAmount}M</TableCell>
              <TableCell align="right">{item.allInvestor.length}</TableCell>
              <TableCell align="right">{item.dateofInvestment}</TableCell>
              {/* <TableCell component="th" scope="row">
                {
                  item.allInvestor.map((item: any) => {
                    return (
                      <span>{item}</span>
                    )
                  })
                }
              </TableCell>
            */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}