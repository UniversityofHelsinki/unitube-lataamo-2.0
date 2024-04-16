import {formatTime} from '../../utilities/timeUtils'

const CustomStatisticTable = ({ processedStatistics }) => {
    return (
        <>
            <table style={{width: '100%', marginTop: '20px'}} aria-describedby="tableSummary">
                <thead>
                <tr style={{backgroundColor: '#f0f0f0'}}>
                    <th style={{padding: '10px'}}>Timestamp</th>
                    <th style={{padding: '10px'}}>Total Connections</th>
                </tr>
                </thead>
                <tbody>
                {processedStatistics.map((statistic, index) => (
                    <tr key={index} style={{borderBottom: '1px solid #ddd'}}>
                        <td style={{padding: '10px'}} tabIndex="0">{formatTime(statistic.timestamp)}</td>
                        <td style={{padding: '10px'}} tabIndex="0">{statistic.totalConnections}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div id="tableSummary" style={{display: 'none'}}>Table showing timestamps and total connections</div>

        </>
    )
        ;
};

CustomStatisticTable.defaultProps = {
    processedStatistics: []
};

export default CustomStatisticTable;
