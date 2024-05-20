export default function DataRow({dataType, dataVal, preSaveUserData, setPreSaveUserData}) {
    const keyValPairCss = "w-full flex justify-between"

    function handleChange(event){
        setPreSaveUserData({
            ...preSaveUserData,
            [dataType]: event.target.value
        })
    }

    return (
        <div className={keyValPairCss}>
            <label className={'font-bold'}>{dataType}</label>
            <input value={preSaveUserData[dataType]} onChange={handleChange}/>
        </div>
    )
}