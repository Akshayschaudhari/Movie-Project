import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Addmovie from './page/Admin/addmovie';
import Bookticket from './page/main/bookticket';
import SelectSeat from './page/main/SelectSeat';
import Moviedetails from './page/main/MovieDetails';
import Home from './page/main/Home';
import Show from './page/main/show';
import Navbar from './components/navbar';
import Signin from './page/main/signin';
import Signup from './page/main/signup';
import Theaterdetail from './page/Theater_admin/Theater_details';
import TheaterScreen from './page/Theater_admin/Add_Screen';
import Book from './page/Theater_admin/BookStatics';
import Screenload from './page/Theater_admin/Theateradminhome';
import Footer from './components/footer';
import Adminhome from './page/Admin/adminhome';
import TheaterRevenue from './page/Admin/theaterRevenue';
import TheaterRevenueTh from './page/Theater_admin/theaterRevenue';
import MovieRevenue from './page/Admin/movieRevenue';
import AddShow from './page/Theater_admin/addShow';
import BookingHistory from './page/user/bookingHistory';
import MovieRevenueByDate from './page/Admin/movieRevenueByDate';
import Cityget from './page/main/Sortbycity';
import EditMovie from "./page/Admin/EditMovie"
import AllBookStat from './page/Theater_admin/allBookingStat';
import ShowAll from './page/main/showAllMovie';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/showmovie' element={<Moviedetails />} />
        <Route path='/selectseat' element={<SelectSeat></SelectSeat>} />
        <Route path='/bookticket' element={<Bookticket></Bookticket>} />
        <Route path='/show' element={<Show></Show>} />
        <Route path='/addtheaterdetails'element={<Theaterdetail></Theaterdetail>} />
        <Route path='/addtheaterscreen' element={<TheaterScreen></TheaterScreen>} />
        <Route path='/bookstats'element={<Book></Book>} />
        <Route path='/theateradmin'element={<Screenload></Screenload>} />
        <Route path='/adminhome'element={<Adminhome></Adminhome>} />
        <Route path='/addmovie' element={<Addmovie></Addmovie>} />
        <Route path='/home' element={<Home></Home>} />
        <Route path='/' element={<Home></Home>} />
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/moviebycity' element={<Cityget></Cityget>}></Route>
        <Route path='/theaterrevenue' element={<TheaterRevenue></TheaterRevenue>}></Route>
        <Route path='/theaterrevenueth' element={<TheaterRevenueTh></TheaterRevenueTh>}></Route>
        <Route path='/movierevenue' element={<MovieRevenue></MovieRevenue>}></Route>
        <Route path='/addshow' element={<AddShow></AddShow>}></Route>
        <Route path='/bookinghistory' element={<BookingHistory></BookingHistory>}></Route>
        <Route path='/movierevenuebydate' element={<MovieRevenueByDate></MovieRevenueByDate>}></Route>
        <Route path='/EditMovie' element={<EditMovie/>}></Route>
        <Route path='/allbookstats' element={<AllBookStat></AllBookStat>}></Route>
        <Route path='/nowshowing' element={<ShowAll></ShowAll>}/>
      </Routes>
      <Footer></Footer>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </BrowserRouter>
  );
}

export default App;
