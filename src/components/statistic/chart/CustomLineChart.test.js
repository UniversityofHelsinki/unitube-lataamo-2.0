import {render} from "@testing-library/react";
import React from "react";
import CustomLineChart from "./CustomLineChart";


it('renders', () => {
    global.ResizeObserver = class ResizeObserver {
        constructor(callback) {
            this.callback = callback;
        }
        disconnect() {}
        observe(element) {
            this.callback([{
                contentRect: element.getBoundingClientRect()
            }]);
        }
        unobserve() {}
    };
    const stats = [{"timestamp":1708681980000,"totalConnections":3}];
    render(
        <CustomLineChart processedStatistics={stats}  />);
});
