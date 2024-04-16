import {useSelector} from "react-redux";
import useSearchParams from "../../hooks/useSearchParams";
import useStatistics from "../../hooks/useStatistics";
import i18n from "i18next";
import useAllRoomStatistics from "../../hooks/useAllRoomStatistics";
import {getDurationInHoursMinutesSeconds, getTimeFormat} from '../utilities/timeUtils';
import CustomLineChart from "./chart/CustomLineChart";
import CustomStatisticTable from "./table/StatisticTable";
import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import {useTranslation} from "react-i18next";

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
    const [searchParams] = useSearchParams();
    const statisticsList = useSelector((state) => state.statistics.statistics);
    const [statistics] = useStatistics(!statisticsList);
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
            const duration = getDurationInHoursMinutesSeconds(
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
                            <Col xs={6}>
                                <h3>{statistic.location}</h3>
                                <h4>{statistic.timeString}</h4>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col xs={6}>
                                <h5> {t('stream_duration')} {statistic.duration} </h5>
                            </Col>
                            <Col xs={6}>
                                <h5> {t('stream_max_viewers')} {statistic.maxViewers} </h5>
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
