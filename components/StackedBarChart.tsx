import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface StackedData {
  category: string;
  income: number;
  expenses: number;
}

const StackedBarChart = ({ data }: { data: StackedData[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr('width', 500)
      .attr('height', 300);

    const categories = data.map(d => d.category);

    const xScale = d3.scaleBand()
      .domain(categories)
      .range([0, 500])
      .padding(0.3);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.income + d.expenses) as number]) // Ensure the max value is correct
      .range([300, 0]);

    const colorScale = d3.scaleOrdinal<string>()
      .domain(['income', 'expenses'])
      .range(['green', 'red']);

    const stack = d3.stack<StackedData>()
      .keys(['income', 'expenses']);

    const stackedData = stack(data);

    svg.selectAll('*').remove(); // Clear previous content

    const groups = svg.append('g')
      .selectAll('g')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', (d) => colorScale(d.key));

    groups.selectAll('rect')
      .data(d => d)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.data.category) as number) // Ensure x position is correct
      .attr('y', (d) => yScale(d[1])) // Use the top of the stack for the Y position
      .attr('height', (d) => yScale(d[0]) - yScale(d[1])) // Calculate height correctly
      .attr('width', xScale.bandwidth()); // Width of each bar

    svg.append('g')
      .attr('transform', 'translate(0, 300)') // Position for the X axis
      .call(d3.axisBottom(xScale));

    svg.append('g')
      .call(d3.axisLeft(yScale)); // Position for the Y axis
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default StackedBarChart;

