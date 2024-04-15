import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useSelector} from "react-redux";
import useSearchParams from "../../hooks/useSearchParams";
import useStatistics from "../../hooks/useStatistics";
import i18n from "i18next";
import useAllRoomStatistics from "../../hooks/useAllRoomStatistics";
import { getDuration } from '../utilities/timeUtils';


const CustomTooltip = ({ active, payload }) => {
    if(active && payload && payload.length) {
        const date = new Date(payload[0].payload.timestamp);
        const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
            <div className='custom-tooltip'>
                <p>{`Time: ${formattedTime}`}</p>
                <p>{`Total Connections: ${payload[0].value}`}</p>
            </div>
        );
    }

    return null;
};


const Statistic = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const statisticsList = useSelector((state) => state.statistics.statistics);
    const [statistics, loadingStatistics] = useStatistics(!statisticsList);

    const finalStatistics = statisticsList || statistics;
    let statistic;

    if (finalStatistics) {
        statistic = finalStatistics.find(
            (stat) =>
                stat.room === Number(searchParams?.room) &&
                stat.start_timestamp === Number(searchParams?.start_timestamp) &&
                stat.end_before_timestamp === Number(searchParams?.end_before_timestamp)
        );

        if (statistic) {
            const formattedDate = new Intl.DateTimeFormat(i18n.language, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }).format(new Date(statistic.start_timestamp));

            const duration = getDuration(
                statistic.start_timestamp,
                statistic.end_before_timestamp
            );
            statistic = {
                ...statistic,
                formattedDate: formattedDate,
                duration: duration,
            };
        }
    }

    const [allRoomStatistics] = useAllRoomStatistics(
        statistic?.start_timestamp,
        statistic?.end_before_timestamp,
        statistic?.room
    );

    let processedStatistics = [];
    if (statistic && statistic.start_timestamp && statistic.end_before_timestamp && statistic.room) {
        processedStatistics = allRoomStatistics;
    }

    const formatTime = (timestamp) => {
        const dateObject = new Date(timestamp);
        const formattedTime = dateObject.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        return formattedTime;
    };

    return (
        <>
            {statistic && (
                <>
                    <div>{statistic.location}</div>
                    <div>{statistic.formattedDate}</div>
                    <div>{statistic.duration}</div>
                    <div>{statistic.maxViewers}</div>

                    {processedStatistics && processedStatistics.length === 0 ? (
                        <div>Data not available</div>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={processedStatistics}>
                                <XAxis
                                    dataKey="timestamp"
                                    tickFormatter={formatTime}
                                    minTickGap={60}
                                />
                                <YAxis/>
                                <CartesianGrid stroke="#ccc"/>
                                <Line
                                    type="monotone"
                                    dataKey="totalConnections"
                                    stroke="#8884d8"
                                />
                                <Tooltip content={<CustomTooltip/>}/>
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </>
            )}
        </>
    );
};

export default Statistic;
