export default function SkillRowEdit({dataType, dataVal}) {
    const keyValPairCss = "w-full flex justify-between my-2"

    return (
        <div className={keyValPairCss}>
            <label className='text-lg text-black dark:text-black font-bold mr-6'>{dataType}</label>
            <div className="flex flex-wrap justify-end">
                {dataVal.map((element, key) => {
                    return (<label key={key} className='rounded-full border-black border-2 mx-2 my-1 py-1 px-3 text-md text-gray-500 dark:text-gray-400'>{element.name}
                    <button className="text-black text-sm pl-2 font-black">X</button>
                    </label>)
                })}
            </div>
        </div>
    )
}