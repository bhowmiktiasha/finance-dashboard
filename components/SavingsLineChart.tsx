import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface SavingsData {
  month: string;
  amount: number;
}

const SavingsLineChart = ({ data }: { data: SavingsData[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', 500)
      .attr('height', 300);

    const xScale = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, 500]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.amount) as number])
      .range([300, 0]);

    const line = d3.line<SavingsData>()
      .x(d => xScale(d.month) as number)
      .y(d => yScale(d.amount));

    svg.selectAll('*').remove();

    svg.append('path')
      .datum(data)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2);

    svg.append('g')
      .attr('transform', 'translate(0, 300)')
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale));
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default SavingsLineChart;
