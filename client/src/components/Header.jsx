/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';
import { MdOutlineHelp } from 'react-icons/md';
import { IoNotificationsCircleSharp } from "react-icons/io5";


export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // eslint-disable-next-line no-unused-vars
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const urlParams = new URLSearchParams(location.search);
  //   urlParams.set('searchTerm', searchTerm);
  //   const searchQuery = urlParams.toString();
  //   navigate(`/search?${searchQuery}`);
  // };

  return (
    <div className='py-7'>
    <Navbar className='border-b-2 h-24 mb-1 mt-[-30px] fixed w-full z-20 top-0 start-0' 
 >
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >  
        <span className='px-3 md:m py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Swap-simple
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </Link>
      {theme==="light"? <img className='h-28 w-28 ml-[-22px] mx-auto ' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAACXBIWXMAAHYcAAB2HAGnwnjqAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAFC5JREFUeJzt3Xm0dWdB3/Fv3peEJAxJmIlAZAozBYEwCCIyGWFZB8BSU6SIIiJ2VWutq112UWmtlaooWBTRApWZBGRsDbBkEKq2UlqDTCKzATKQAJmT/rFDrSEh771n3/Psc+7ns9azkn/OOb999l3v/p09PE8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOMdNjrA1Ti6+u7q0dVtqmPGxgHYU1+pzr9ynFedW322+ovqjCv/H2a3tALwg9V/qI4fHQRgIc5pKgPvrd5avbu6eGgitsKSCsC/r352dAiAhfty9fbqLdVrqi+OjcOmWkoBeHr1m6NDAGyYi5pKwAuazgzAIVtCAbhp9dHqhqODAGyw/1M9r/rd6pLBWdgAB0YHqJ6agz/Aqu7edCbgjOoHWsYPPBZsCQXgMaMDAGyRO1SvqP6k+o7BWViwJTTEv6luPjoEwJZ6dfW0pqcJ4P9ZwhmAo0YHANhij6/eXz1sdBCWZQkFwCQXAHvrNtXp1X+srjs4CwuxhALwrtEBAPaBA9VPVe9oevqKfW4JBeClowMA7CMPbPrhdbvRQRhrCQXgXdUfjA4BsI/cqWlq4fuPDsI4S3gKoOrG1fuaHl8BYD2+Wn1nLsXuS0s4A1B1VvXgTGUJsE5HN52B/Xujg7B+SykAVWdWD61OaWqjl42NA7AvHNu0yuDtRwdhvZZyCeDqXK/p0ZWjRwcBFu021amjQ2yBv6q+tWlyNgBYvCdXVxizjP+RH137xpIuAQDshhnu5vMt1Ytb9tlhZnJwdACAFf1KddzoEFvkrk3LCXsyAIDFOqa6vPGnzrdtXF49YQf7gQ3kEgCwye6R09V74bDqRdU9Rwdh7ygAwCa72+gAW+z6TXME3Gx0EPaGAgBsshNGB9hyJ1SnZQXBraQAAJvsVqMD7AMPqn5rdAjmpwAAm+z40QH2iR+q/unoEMxLAQA22bGjA+wjz6keOzoE81EAgE121OgA+8iB6mW58XJrKADAJlMA1usG1Ruqm4wOwuoUAGCTHT46wD502+oV1XVGB2E1CgAAO/Xw6ldHh2A1CgAAu/ET1dNHh2D3FAAAduu51XeMDsHuKAAA7Nbh1aurO4wOws4pAACs4kZNTwYcMzoIO6MAALCqO1evrA6ODsKhUwAAmMOjq18cHYJDpwAAMJefqZ46OgSHRgEAYE7Pr75tdAiunQIAwJyOqF5V3WZ0EL4xBQCAud28en11vdFBuGYKAAB74V7VS3KcWSw7BoC98n3Vz48OwdVTAADYSz9fPXF0CL6eAgDAXjqselF1v9FB+LsUAAD22lHV66pvGh2Ev6UAALAOxzc9GXD06CBMFAAA1uU+1W+NDsFEAQBgnU6pfnZ0CBQAANbv31XfPTrEfqcAALBuB6rfr+4xOsh+dtjoAHvs6Oq2TdNSblLZObv6RHXW6CALdUx1QnWz0UF26Mym/Xre6CBb5FPVrUaHYNf+ujqp+sLgHGyR+1WnVV+trtjQcVn1nupxbX9RO1SPrk6vLmn8/tntuKh6a/Wwmb+b/epTjd+nxmrjXU0LCMFKDlS/WF3e+D/qOcebm3717ldHNp0uHL0f5h4vzD98q1IAtmP87lV3LOzU8xr/h7xX4783HQj3m4NNBWj0979X49U5w7MKBWB7xk8Gu/S4xv8B7/X4tdm+rc3xLxr/ve/1eMZs39b+owBsz7i0+q5Ym2355XFY9ZfViaOD7LGLm7bxE6ODrMkxTdu67Zc/vtB0U+MFo4NsIDcBbpfzqgdWZ4wOsh9s0p3x38j92v6Df03Xix83OsQaPbbtP/hX3bR65OgQsAA3rE6tjhsdZD/YlgLwwNEB1uhBowOskf0K+8+dqldW1xkdZNttSwG45egAa3T86ABrdIvRAdZoP+1XuDaPrJ4zOsS225YCsJ8epbru6ABrZFth//on1dNGh9hm21IAANg+v5FJs/aMAgDAUh3eNFfG7UcH2UYKAABLduPqDe2PJ4LWSgEAYOnuUr28aWZQZqIAAJvsktEBWJuTq18YHWKbKADAJjt/dADW6ueqU0aH2BYKALDJFID954XVA0aH2AYKALDJFID958jqtOrWo4NsOgUA2GTnjQ7AELdoKgFHjw6yyRQAYJN9cnQAhrlP9ZK2Z1XbtVMAgE32odEBGOr7q381OsSmUgCATaYA8KzqB0aH2EQKALDJFAAOq36vuu/oIJtGAQA22eerL4wOwXBHVa+tbj46yCZRAIBN987RAViE21SnZmntQ6YAAJvuHaMDsBgPqn57dIhNoQAAm+7towOwKE+q/tnoEJtAAQA23Qerz44OwaL8UvXY0SGWTgEAtsHrRwdgUQ5UL6vuPjrIkikAwDZ46egALM4Nqj+objo6yFIpAMA2eG/mBODr3bbp8cAjRgdZIgUA2BYvGx2ARXpI9Z9Gh1giBQDYFr9XXTI6BIv0lOrHR4dYGgUA2Bafqv7L6BAs1nOrh48OsSQKALBN/m116egQLNJ1qldVdxwdZCkUAGCbfKx6zegQLNaNqjdUx44OsgQKALBtfiFnAbhmd2q6YfTg6CCjbUsBOHd0gDU6a3SANTpndIA12k/7da+d0XS9F67JyU2zBe5r21IAPjY6wBr91egAa2Rb2a1nVZ8ZHYJF++nqR0aHGGlbCsB/qy4bHWJN3jw6wBq9ZXSANdpP27oO51c/NToEi/f86qGjQ7C6F1dXbPn4UHX4XF/Yhnh347/3vR5vne3b4qpe1/j9ayx7nFmdEBvtVk07cvQf016NS6tHzvZtbY77VBc0/vvfq3F+ddfZvi2u6rjq443fz8ayx/ur68dGe2B1duP/mOYel1ZPn/F72jSPqy5s/H6Ye3ylesyM3xNX76Tqosbvb2PZ47S257L4vnXH6h2N/2Oaa3yketSs39BmekD1vxq/P+Yaf1rde9ZviG/kpxu/z43lj19oHzlsdIA99ODqe5vWg77x4Cw79ZXqw003hr0h85t/zYHqO6vHVneubjg2zo6dW/1l09r1pzf9g8P6/Hr1zNEhWLQrqlOysBTAVjlYvbrxvzKNZY8Lmi4bbb1tPgMAcFVHVG9sf95Qy6H7XFMJ+PToIHvJDQ/AfnJx9fjqnaODsGi3rF5bHTU6CADzum4uBxjXPl7VFp8p3/eLIQD70mXVqdUtmuaagKtzt6azRu8aHWQvKADAfnVF9aamOSa+PZdEuXoPqz7Q9AQPAFvmpMwYaFzzOL+6ZwBspZs0nREYfbAxljk+Xt00ALbW46u/afwBx1jeeHfTDaRbwT0AAH/XGdXvVEdX9829Afyt21S3blplcuMpAABf78KmZZrfWB1fndgWPw7Gjtyr+lL1vtFBANh7d69e0rQux+jT0Mb4cWlW8gTYV06sfrn6TOMPQsbYcU7TomQA7CMHm5bpfml1XuMPRsaY8eHquDaUa1oAqznYdF34EU3LkH9bm7dUNbt3enVy02WBjaIAAMzr8Op2TaeH79R02eCEpl+KN7hyXP/K/7Idnlc9c3QIAOAb+0fNfzngx9a6BQDArvxG8xaAi6uHr3ULAIAdO7z6o+YtAedUd1nnRgAAO3fjpjv5534ywE2gALBwd67Obt4S8Iq1bgEAsCuPaP5ZHp+y1i0AAHblh5u3AHyputVatwAA2JVfbd4S8Pr1xgcAduNg9ebmLQHfs9YtAAB25QbVB5qvAHy0OmKtWwAA7Mo3V2c2Xwn4ibWmBwB27SHVRc1TAD5XHbne+ADAbj2l+c4CPG3N2QGAFbyoeQrAx5puMgQANsCR1fubpwQ8Zs3ZAYAV3K1ptb9VC8Br1h0cAFjNc1u9AFxU3XTdwQGA3btRdVarl4AfXXfwa+KGBAC4dhdcOU5e8X0Oq16+ehwAYF2uW32+1c4AfLW63rqDX50DowMAwIa4qHrxiu9xVNMkQ8MpAABw6F7Q9Et+FQ+aIwgAsF5vb7XLAG9bf+Sv5wwAAOzMm1d8/X2bbgYEADbIfVr9ccBvWntqAGAlB6uzW60APGLtqa/CJQAA2JnLqves+B4nzhFkFQoAAOzcx1Z8/c1mSbECBQAAdu6TK75eAQCADfSJFV8/fFEgBQAAdu6zK77+yFlSrEABAICdW3U2wOvMkmIFCgAA7NyqB/DhBWB4gGtwsLpXdavqiMFZAFiGc6q/qD43OkirHz8vnCXFCpZWAI6t/nn11BZwgwQAi3N59cfVs6rTB+ZY9Rr++bOkWMGSLgHcu/pA9XM5+ANw9Q5UD67+sHp+437I3m7F1583S4oVLOUMwIlNqyMdNzoIABvjx6vrVU8e8Nl3XPH1n58lxQqWcAbgQPWKHPwB2Lkfqh4/4HNXncp31YmEVraEAvB9Taf/AWA3nt36l9e964qvVwCqJ44OAMBGO7H1/pC8Y/XNK77Hh2fIsZIlFICTRgcAYOOt81jymBVff06rTyW8siUUAHf8A7CqdS6uc/KKr/+frT6T4MqWUACGPwoBwMY7d02fc6PqoSu+x5/OEWRVSygAZ4wOAMDG++CaPudp1XVXfI+3zRFkVUsoAK8bHQCAjXZu9Udr+JzDm+YeWMWF1XtmyLKyJRSA36nOHB0CgI31y9XFa/icJzStUbOKd1YXzJBlZUsoAF9uOqVy+eggAGycP6t+ZQ2fc0T1L2d4n1fN8B6zWEIBqHp99Yzq0tFBANgYf179/dazst7PVHdZ8T0uqU6bIcssllIAql5QPayF3B0JwGJdWP1S9ZDqs2v4vNs3z6//t1Rnz/A+s1j31ImH4rDqW6pHVrfOPAEATNf4P9O0auybWt9jfweaDtyPmuG9vuvK9wIAFu7ZTZP2rDo+0rLOugMA1+AfNN2gPkcB+Mk1ZwcAduGk6qvNc/D/THXUeuMDADt1/+qs5jn4X9HqkwcBAHvsMc33y/+K6mNNcwgAAAv1o01PG8x18L+ieuxatwAAOGTHVi9r3gP/FVnrBgAW61HVp5v/4P+l6oQ1bgcAcAju0TQv/9wH/q+NU9a3KQDAtTmpek3zPd9/dePla9saAOAandA0l/8H27uD/tfGGdUN17NZq1niWgAAsFvXr25XPeDKcf/qzq1nGt5zms4wfHQNn7Wy64wOcDWObHoO81FNiwHdbGwcABbuYHWTK8eRgzJcXD2hDTn41/IKwBOq5zQd+AFgE1xW/WB1+uggO7GklYn+TfXKHPwB2ByXVz/cdGPhRlnKPQBPrV44OgQA7MAl1T+ufn90kN1YQgE4rmmu5ONGBwGAQ3RR9cTqtNFBdmsJ9wD8SA7+AGyOT1ffX/3J6CCrWMI9ABZKAGBTvKu6bxt+8K9lFIA7jA4AANfi0urZ1cOrMwdnmcUSLgEcPToAAHwDH62eVL13dJA5LeEMwOdGBwCAq3FB9a+bFg7aqoN/LaMAvHt0AAD4/1xevaK6a9McNReOjbM3llAAXjo6AAA0HfhfXd2z6RG/vx6aZo8tYR6AqjfkaQAAxji3+s/Vb1YfGRtlfZZSAG7S9EjFbUcHAWBfuKT6w6ZT/adWXxkbZ/2WUgCqjq9e27R8IwDM7dNNC/a8rXpzdfbYOGMtqQDUdE/Ck6ofa1pTeWn5AFi+c6tPVh+v/nf151eOj48MtTRLPsAe27Qy4M1HBwFg0c6tvtp0Gv+s6stj4wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPvRkhcDOro64cr/AsA6XVJ9tvri6CB7ZYkF4HurZ1TfXh0cGwWAfe6M6iXVr1cXDM4yqyUVgGOql1cnjw4CAFfxiep7qvePDjKXpRSAo6t3VvcZHQQArsGXq4e0JSXgwOgAV/q1HPwBWLbrV6dWR44OMoclXGO/c/XCllNGAOCaHFedXb1vdJBVLeGg+w9bRhEBgENxyugAc1hCAXjw6AAAsAP3brocsNGWUABuOToAAOzAYW3BsWsJBWCrnqsEYF/4yugAq1pCAfjo6AAAsAPnV2eODrGqJRSAN40OAAA78F+ry0aHWNUSJgI6svpwdevRQQDgEHxr9cejQ6xqCWcALqyeWV0xOggAXIvfbgsO/rWc5+8/VH2pelTLOCsBAFf1xurJbcHp/1pOAahpVqU/qx5Q3WhwFgD4mi9Xz2o6W33p4CyzWeKv7SOaVgQ8ubpdygAA63dB0wqA72ya//+LY+MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANvp/wIVKE8ScbQi4wAAAABJRU5ErkJggg==" alt="" />:  <img className='h-28 w-28 ml-[-22px] mx-auto ' src="data:image/png;base64,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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUvhvgQWGFnfZWW0AAAAASUVORK5CYII=" alt="" />}
    
     

      <span>  
     </span>
      {/* <form onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Search...'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form> */}
      {/* <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>
         */}
    
      <div className='flex gap-2 md:order-2'>
      
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/sign-in'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className='bg-white md:bg-inherit mt-8 mb-4'>
        
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        
        <Navbar.Link active={path === '/request'} as={'div'}>
          <Link to='/request'>All request</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/help'} as={'div'} className='md:mr-2'>
          <Link to='/help' className='flex'> <MdOutlineHelp className=' text-3xl'/>  Help</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/notification'} as={'div'} className='md:mr-6'>
          <Link to='/notification' className='flex'> <IoNotificationsCircleSharp className='mt-[px] mr-1 text-3xl'/>  Notification</Link>
        </Navbar.Link>
         <div className='md:mt-[-20px]'>
       <Navbar.Link>
        
        <Button
          className='w-12 h-10  mx-8 '
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        </Navbar.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}