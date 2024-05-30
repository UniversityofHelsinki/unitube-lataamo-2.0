import {formatTime} from '../../utilities/timeUtils'
import {useTranslation} from "react-i18next";
import './StatisticTable.css';
import {ReactComponent as ToggleCollapsed} from '../../utilities/icons/caret-down.svg';
import {ReactComponent as ToggleVisible } from '../../utilities/icons/caret-up.svg';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

const CustomStatisticTable = ({ processedStatistics }) => {
    const { t } = useTranslation();
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="stream-statistics-table">
            <Table aria-describedby="tableSummary">
                <thead>
                <tr style={{backgroundColor: '#f0f0f0'}}>
                    <th>{t('timestamp')}</th>
                    <th>{t('total_connections')}</th>
                    <th>{t(`stream_statistics_table_toggle_button_status_${isCollapsed ? 'collapsed' : 'visible'}`)}</th>
                    <th style={{textAlign: 'right'}}>
                        <div>
                            <button className="stream-statistics-table-toggle-button" onClick={toggleCollapse} aria-label={t('stream_statistics_table_toggle_button')} title={t(`stream_statistics_table_toggle_button_status_${isCollapsed ? 'collapsed' : 'visible'}`)}>
                                {isCollapsed ? <ToggleCollapsed /> : <ToggleVisible />}
                            </button>
                        </div>
                    </th>
                </tr>
                </thead>
                {!isCollapsed && <tbody>
                {processedStatistics.map((statistic, index) => (
                    <tr key={index}>
                        <td>{formatTime(statistic.timestamp)}</td>
                        <td>{statistic.totalConnections}</td>
                        <td></td>
                    </tr>
                ))}
                </tbody>}
            </Table>
            <div id="tableSummary" style={{display: 'none'}}>{t('stream_statistics_table_summary')}</div>
        </div>
    );
};

CustomStatisticTable.defaultProps = {
    processedStatistics: []
};

export default CustomStatisticTable;
