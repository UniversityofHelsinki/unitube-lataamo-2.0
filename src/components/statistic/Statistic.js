import {useSelector} from "react-redux";
import useSearchParams from "../../hooks/useSearchParams";
import useStatistics from "../../hooks/useStatistics";
import i18n from "i18next";
import useAllRoomStatistics from "../../hooks/useAllRoomStatistics";
import {getDuration} from '../utilities/timeUtils';
import CustomLineChart from "./LineChart";
import CustomStatisticTable from "./StatisticTable";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {useTranslation} from "react-i18next";

const getTimeFormat = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const optionsDate = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };

    const formattedStartDate = new Intl.DateTimeFormat(i18n.language, optionsDate).format(startDate);
    const startHours = startDate.toLocaleTimeString(i18n.language, optionsTime);

    const endHours = endDate.toLocaleTimeString(i18n.language, optionsTime);

    return `${formattedStartDate} ${startHours} - ${endHours}`;
};

const StatisticsComponents = ({ processedStatistics }) => (
    <>
        <CustomLineChart processedStatistics={processedStatistics} />
        <CustomStatisticTable processedStatistics={processedStatistics} />
    </>
)

const renderDataOrMessage = (data, Component) => {
    if (data && data.length === 0) {
        return <div>Data not available</div>;
    } else {
        return <Component processedStatistics={data} />;
    }
};

const Statistic = () => {
    const { t } = useTranslation();
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
            const timeString = getTimeFormat(statistic.start_timestamp, statistic.end_before_timestamp);
            statistic = {
                ...statistic,
                formattedDate: formattedDate,
                duration: duration,
                timeString: timeString
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
    return (
        <>
            {statistic && (
                <>
                    <Container className="ps-0">
                        <Row className="mb-4">
                            <Col>
                                <h2>{statistic.location}</h2>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <h3>{statistic.timeString}</h3>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <h3> {t('stream_duration')}  {statistic.duration}</h3>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col>
                                <h3> {t('stream_max_viewers')} {statistic.maxViewers} </h3>
                            </Col>
                        </Row>
                    </Container>
                    {renderDataOrMessage(processedStatistics, StatisticsComponents)}
                </>
            )}
        </>
    );
};
export default Statistic;
