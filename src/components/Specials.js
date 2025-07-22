import salad from '../images/greek salad.jpg';
import { Link } from 'react-router-dom';

function Specials() {
    return(
        <article className="large-div">
            <div className='main-div title-div'>
                <h2 style={{color:"#333333"}}>This week's specials!</h2>
                <Link to="/" aria-label="Food menu" className='button-normal section-category button-right'>Online Menu</Link>
            </div>
            <div className='main-div' style={{marginTop:"50px"}}>
                    <div className="card">
                        <div className='card-img-container'>
                            <img src={salad} width={350} height={390} alt="Greek salad" />
                        </div>
                        <div className='card-desc'>
                            <h3 className='card-title'>Greek salad</h3>
                            <span className='price'>$12.99</span>
                        </div>
                    </div>
            </div>
        </article>
    );
}

export default Specials;