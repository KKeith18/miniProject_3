export default function barChart(container){

    const margin = ({top: 20, right: 20, bottom: 60, left: 50})
  
    const width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
  
    const svg = d3.select(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    const xScale = d3
        .scaleBand()
        .range([0, width])
        .paddingInner(0.1)
  
    const yScale = d3
        .scaleLinear()
        .range([height,0])

    const xTime = d3.scaleTime()
        .rangeRound([0, width])
  
  
    const xAxis = d3.axisBottom()
      .scale(xTime)
  
    const yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(10, "s")
  
    svg.append("g")
    .attr("class", "axis x-axis")
  
    svg.append("g")
    .attr("class", "axis y-axis")
  
    svg.append("text")
    .attr("class", "y label")
    
    function update(data, data_2, type){
    
        // Update scale domains
        xScale.domain(data_2.map(d=>d.date))

        if (type == 'daily_vaccinations_per_million'){
            yScale.domain([0,13024])
        }

        else if (type == 'death_rate'){
            yScale.domain([0,173])
        }

        else {
        yScale.domain([0,d3.max(data.map(d=>d[type]))])
        }

        xTime.domain(d3.extent(data_2.map(d=>d.date)))
    
        const bars = svg.selectAll('.bar')
        .data(data);

        const formatTime = d3.timeFormat("%B %d, %Y");

        d3.select('.tooltip')
        .style('display', 'none');
    
    if (type =='deaths'){
        bars.enter()
        .append('rect')
        .attr('x', d=>xScale(d.date))
        .attr("y", (d)=> yScale(d[type]))
        .merge(bars)
        .on("mouseenter", (event, d)=>{
            const pos = d3.pointer(event, window)
                tooltip = d3.select('.tooltip')
                .style('display', 'block')
                .style('position', 'absolute')
                .style('top', pos[1] + 'px')
                .style('left', pos[0] + 'px')
                .html

                (`<p>
                Date: ${formatTime(d.date)} <br>
                Total Deaths: ${[d[type]]}
                      </p>`);
            
              })
              .on('mouseleave', (event,d)=>{
                  d3.select('.tooltip')
                      .style('display', 'none');
      
              })
            .transition()
            .duration(1000)
            .delay(500)
            .attr('x', d=>xScale(d.date))
            .attr('y', d => yScale(d[type]))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d[type]))
            .style("opacity", .75)
            .attr('fill', 'red')
            .attr("class","bar");
            }

        else if (type == 'cases'){
            bars.enter()
            .append('rect')
            .attr('x', d=>xScale(d.date))
            .attr("y", (d)=> yScale(d[type]))
            .merge(bars)
            .on("mouseenter", (event, d)=>{
                const pos = d3.pointer(event, window)
                    tooltip = d3.select('.tooltip')
                    .style('display', 'block')
                    .style('position', 'absolute')
                    .style('top', pos[1] + 'px')
                    .style('left', pos[0] + 'px')
                    .html
                    (`<p>
                    Date: ${formatTime(d.date)} <br>
                    Total Cases: ${d[type]}                     
                        </p>`);
                
                })
                .on('mouseleave', (event,d)=>{
                    d3.select('.tooltip')
                        .style('display', 'none');
        
                })
            .transition()
            .duration(1000)
            .delay(500)
            .attr('x', d=>xScale(d.date))
            .attr('y', d => yScale(d[type]))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d[type]))
            .style("opacity", .75)
            .attr('fill', '#69a3b2')
            .attr("class","bar");

        }


        else if (type == 'death_rate'){
            bars.enter()
            .append('rect')
            .attr('fill', '#FFFFF')
            .attr('x', d=>xScale(d.date))
            .attr("y", (d)=> yScale(d.daily_deaths))
            .merge(bars)
            .on("mouseenter", (event, d)=>{
                const pos = d3.pointer(event, window)
                    tooltip = d3.select('.tooltip')
                    .style('display', 'block')
                    .style('position', 'absolute')
                    .style('top', pos[1] + 'px')
                    .style('left', pos[0] + 'px')
                    .html

                    (`<p>
                    Date: ${formatTime(d.date)} <br>
                    Death Rate (per Mil): ${d[type]} 
                
                    
                        </p>`);
                
                })
                .on('mouseleave', (event,d)=>{
                    d3.select('.tooltip')
                        .style('display', 'none');
        
                })
            .transition()
            .duration(1000)
            .delay(500)
            .attr('x', d=>xScale(d.date))
            .attr('y', d => yScale(d[type]))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d[type]))
            .style("opacity", .75)
            .attr('fill', 'red')
            .attr("class","bar");

        }

        else if (type == 'daily_vaccinations_per_million'){
            bars.enter()
            .append('rect')
            .attr('x', d=>xScale(d.date))
            .attr("y", (d)=> yScale(d[type]))
            .merge(bars)
            .on("mouseenter", (event, d)=>{
                const pos = d3.pointer(event, window)
                    tooltip = d3.select('.tooltip')
                    .style('display', 'block')
                    .style('position', 'absolute')
                    .style('top', pos[1] + 'px')
                    .style('left', pos[0] + 'px')
                    .html

                    (`<p>
                    Date: ${formatTime(d.date)} <br>
                    Daily Vaccinations: ${d[type]} 
                
                    
                        </p>`);
                
                })
                .on('mouseleave', (event,d)=>{
                    d3.select('.tooltip')
                        .style('display', 'none');
        
                })
            .transition()
            .duration(1000)
            .delay(500)
            .attr('x', d=>xScale(d.date))
            .attr('y', d => yScale(d[type]))
            .attr('width', xScale.bandwidth())
            .attr('height', d => height - yScale(d[type]))
            .style("opacity", .75)
            .attr('fill', '#69a3b2')
            .attr("class","bar");

        }
        bars.exit()
        .transition()
        .duration(1000)
        .remove();
    
        svg.select(".x-axis")
        .transition()
        .duration(1000)
        .call(xAxis)
        .attr("transform", `translate(0, ${height})`);
    
        svg.select(".y-axis")
        .transition()
        .duration(1000)
        .call(yAxis)
        .attr("transform", `translate(0, 0)`)

        if (type == 'death_rate'){
            svg.select(".y")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text('Death Rate (per million)');
        }
    
        else if (type == 'daily_vaccinations_per_million') {
            svg.select(".y")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text('Daily Vaccinations (per million)');
        }

        else if (type == 'deaths') {
            svg.select(".y")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text('Deaths');
        }

        else if (type == 'cases') {
            svg.select(".y")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text('Total Cases');
        }

        else if (type == 'people_vaccinated') {
            svg.select(".y")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text('Total Vaccinations');
        }

        if (type == 'death_rate'){
        const line = d3.line()
        .x(d => xScale(d.date))
        //.y(d => yScale(d[type]));
        .y(d=> yScale(d.daily_deaths))
        const path = svg
        .append("path")
        .datum(data)
        .transition()
        .duration(2000)
        .delay(100)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", line);
        }
        else{
        const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d[type]));
        const path = svg
        .append("path")
        .datum(data)
        .transition()
        .duration(2000)
        .delay(100)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", line);
        }

    /*    const path = svg
        .append("path")
        .datum(data)
        .transition()
        .duration(2000)
        .delay(100)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", line);
*/
        if (data[0].state == 'Massachusetts' || data[0].location == 'Massachusetts') {
            svg.append('text').text('MASSACHUSETTS').attr('x', 50).attr('y', +25).attr('font-size', 25);}
        else if (data[0].state == 'Mississippi' || data[0].location == 'Mississippi') {
            svg.append('text').text('MISSISSIPPI').attr('x', 50).attr('y', +25).attr('font-size', 25);}
        else if (data[0].Entity == 'United States') {
            svg.append('text').text('NATIONAL DATA').attr('x', 50).attr('y', +25).attr('font-size', 25);}
  }

  return {update}
    
  }