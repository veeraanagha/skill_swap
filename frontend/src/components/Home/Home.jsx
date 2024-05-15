import homepageImg from '../../assets/homepageImg.gif'
import GetStartedBtn from './GetStartedBtn'

export default function Home() {
    return (
        <>
            <div className='space-around flex justify-center items-center'>
                <div>
                    <img src={homepageImg} />
                </div>
                <div>
                    <div className="container">
                        <GetStartedBtn />
                    </div>
                </div>
            </div>
        </>
    )
}