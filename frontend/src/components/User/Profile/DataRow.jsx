

export default function DataRow({dataType, dataVal}) {
    const keyValPairCss = "w-full flex justify-between"

    return (
        <div className={keyValPairCss}>
            <label className={'font-bold'}>{dataType}</label>
            <label>{dataVal}</label>
        </div>
    )
}