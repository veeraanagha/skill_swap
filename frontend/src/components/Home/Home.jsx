import GetStartedBtn from './GetStartedBtn'

export default function Home() {
    console.log(document.cookie)
    return (
        <>
            <div className='space-around flex justify-center items-center'>
                    <div className='min-w-80'>.</div>
                    <div className="container">
                        <GetStartedBtn />
                    </div>
            </div>
        </>
    )
}