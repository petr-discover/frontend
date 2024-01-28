import { useRef, useEffect } from "react";
import { forceSimulation, forceLink, forceManyBody, forceCenter } from "d3-force";
import { select } from "d3-selection";

function Graph(){  //data, width, height, onNodeClick){   //TODO: define width, height, and onNodeClick
    const ref = useRef(null);

    //data starts here
    const width = 800;
    const height = 800;
    
    const data = {
            "nodes": [
              {
                "user_uid": "1",
                "friend_uid": "user1",
                "card_name": "Me",
                "user_photo": "user1_photo.jpg",
                "relation_name": "Friend"
              },
              {
                "user_uid": "2",
                "friend_uid": "user2",
                "card_name": "Ben",
                "user_photo": "user2_photo.jpg",
                "relation_name": "Friend"
              },
              {
                "user_uid": "3",
                "friend_uid": "user3",
                "card_name": "Hannah",
                "user_photo": "user2_photo.jpg",
                "relation_name": "Classmate"
              },
              {
                "user_uid": "4",
                "friend_uid": "user4",
                "card_name": "Time",
                "user_photo": "user2_photo.jpg",
                "relation_name": "Friend"
              },
              {
                "user_uid": "5",
                "friend_uid": "user5",
                "card_name": "Peter",
                "user_photo": "user2_photo.jpg",
                "relation_name": "Soccer club"
              }
            ],

            "links": [
              {
                "source": "user1",
                "target": "user3"
              },
              {
                "source": "user1",
                "target": "user2"
              },
              {
                "source": "user2",
                "target": "user4"
              },
              {
                "source": "user1",
                "target": "user5"
              }
            ]
          };
    console.log(data);
      const onNodeClick = () =>{
        //TODO: delete
    };
    useEffect(() =>{

        const svg = select(ref.current);
        svg.style("background-color", "black");
        const user_id = 'user1';         //TODO: fix this

        svg
            .append("defs")
            .append("mask")
            .append("circle")
            .append("filter")
            .attr("id", "drop-shadow")
            .append("feGaussianBlur")
            .attr("dx", 0)
            .attr("dy", 0)
            .attr("stdDeviation", 1) 
            .attr("flood-color", "blue");

        const simulation = forceSimulation(data.nodes)
            .force(
              "link",
              forceLink(data.links)
                .id((d) => d.friend_uid)
                .distance(85)
            )
            .force("charge", forceManyBody().strength(-600))
            .force("center", forceCenter(width / 2, height / 2));

        svg
            .append("defs")
            .selectAll("clipPath")
            .data(data.nodes)
            .join("clipPath")
            .attr("id", "clipObj")
            .append("circle")
            .attr("r", 20); //here 8

        const link = svg
            .selectAll("line")
            .data(data.links)
            .join("line")
            .attr("stroke", "white")
            .attr("stroke-opacity", 0.2)
            .attr("stroke-width", 1);

        const linkLabels = svg
            .selectAll(".link-label")
            .data(data.links)
            .join("text")
            .attr("class", "link-label")
            .style("text-anchor", "middle")
            .style("fill", "white")
            .style("font-family", "Arial")
            .style("font-size", 10) //here 5
            .text((d) => d.target.relation_name); 

        const node = svg
            .selectAll("g")
            .data(data.nodes)
            .join("g")
            .attr("transform", (d) => `translate(${d.x}, ${d.y})`)
            .on("click", (d) => {
              onNodeClick(d);
            })
            .on("mouseover", function () {
              select(this).style("cursor", "pointer"); // Change the cursor to the pointer on mouseover
            })
            .on("mouseout", function () {
              select(this).style("cursor", "default"); // Reset the cursor to default on mouseout
            });

        node
            .append("circle")
            .attr("r", (d) => (d.friend_uid === user_id ? 10 : 8.5)) // user_uuid와 friend_uid가 같을 때 원의 반경을 12로 설정, 그렇지 않으면 기존대로 8.5로 설정
            .attr("fill", "lightblue")
            .attr("opacity", 0.8)
            .attr("filter", "url(#drop-shadow)")
            .on("click", (d) => {
              onNodeClick(d);
            })
            .on("mouseover", function () {
              select(this).style("cursor", "pointer");
            })
            .on("mouseout", function () {
              select(this).style("cursor", "default");
            });
        
        // node
        //     .append("image")
        //     .attr("href", (d) => d.user_photo)
        //     .attr("x", (d) => (d.friend_uid === user_uuid ? -12 : -8)) // image's centering adjustment also needs to match with the circle's radius
        //     .attr("y", (d) => (d.friend_uid === user_uuid ? -12 : -8)) // image's centering adjustment also needs to match with the circle's radius
        //     .attr("width", (d) => (d.friend_uid === user_uuid ? 24 : 16)) // Adjust the size of the image if the user_uuid matches with the friend_uid
        //     .attr("height", (d) => (d.friend_uid === user_uuid ? 24 : 16)) // Adjust the size of the image if the user_uuid matches with the friend_uid
        //     .attr("clip-path", "url(#clipObj)");

        node.append("circle").attr("r", 8).attr("fill", "black").attr("opacity", 0.4);

        const label = svg
            .selectAll(".label")
            .data(data.nodes)
            .join("text")
            .attr("class", "label")
            .style("text-anchor", "middle")
            .style("fill", "white")
            .style("font-family", "Sans-Serif")
            .style("font-size", 15)
            .text((d) => d.card_name)
            .on("click", (d) => {
                onNodeClick(d);
            })
            .on("mouseover", function () {
                select(this).style("cursor", "pointer"); // Change the cursor to the pointer on mouseover
            })
            .on("mouseout", function () {
                select(this).style("cursor", "default"); // Reset the cursor to default on mouseout
            });
        simulation.on("tick", () => {
            link
                .attr("x1", (d) => d.source.x)
                .attr("y1", (d) => d.source.y)
                .attr("x2", (d) => d.target.x)
                .attr("y2", (d) => d.target.y);
        
            node.attr("transform", (d) => `translate(${d.x}, ${d.y})`);
        
            label.attr("x", (d) => d.x + 0.3).attr("y", (d) => d.y + 3);
        
            linkLabels
                .attr("x", (d) => (d.source.x + d.target.x) / 2)
                .attr("y", (d) => (d.source.y + d.target.y) / 2);
            });
        }, []);
        // }, [data, width, height, onNodeClick]);
    return (
        <>
            <svg ref={ref} style={{ width, height }} viewBox={`0 0 ${width} ${height}`} />
        </>
    );
}

export default Graph;
