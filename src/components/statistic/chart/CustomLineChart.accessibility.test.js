import {render} from "@testing-library/react";
import {axe} from "jest-axe";
import CustomLineChart from "./CustomLineChart";

describe('StatisticCard', () => {
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
    it('should not have any accessibility violations', async () => {
        const stats = [{"timestamp":1708681980000,"totalConnections":3}];
        const { container } = render(<CustomLineChart processedStatistics={stats} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
