const Title =()=>(
    
    <a href="/">
    {/* <h1 id="title">Food Villa by Jaksh</h1> */}

      <img className='logo' src="https://cdn.dribbble.com/users/1635051/screenshots/4291569/socio_curry_logo-01.png"/>
  
    </a>
    )

    
const Header =()=>{
    return(
      <>
        <div className='header'>
     <Title/>
       
         
          <div className='nav-items'>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact Us</li>
            <li>Cart</li>
          </ul>
          </div>
       
        </div>
      </>
    ) 
  }
export default Header