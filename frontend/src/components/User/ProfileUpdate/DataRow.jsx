export default function DataRow({dataType, dataVal, preSaveUserData, setPreSaveUserData}) {
    const keyValPairCss = "w-full flex justify-between my-2"

    function handleChange(event){
        setPreSaveUserData({
            ...preSaveUserData,
            [dataType]: event.target.value
        })
    }

    return (
        <div className={keyValPairCss}>
            <label className='text-lg text-black dark:text-black font-bold mr-4'>{dataType}</label>
            <input className='px-3 border-2 rounded-lg border-black text-lg text-gray-900' value={preSaveUserData[dataType]} onChange={handleChange}/>
        </div>
    )
}