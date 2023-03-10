import * as React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from "styled-components";

import * as AllIcons from "../../src/icons";

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 80vw;
  margin: auto;
`;

const Card = styled.div`
  height: 90px;
  margin: 12px 0 16px;
  width: 20%;
  text-align: center;
`;

const NameDescription = styled.p`
  display: block;
  text-align: center;
  transform: scale(0.83);
  font-family: "Lucida Console", Consolas;
  white-space: nowrap;
`;

const AllIconDemo = () => {
	// 显示图标列表
	const visibleIconList = Object.keys(AllIcons);

	return (
		<div style={{ color: "#555", overflow: "auto" }}>
			<Container>
				{visibleIconList.map((iconName) => {
					const Component = AllIcons[iconName];

					return (
						<Card key={iconName}>
							<Component style={{ fontSize: "24px" }} />
							<NameDescription>{iconName}</NameDescription>
						</Card>
					);
				})}
			</Container>
		</div>
	);
};
export default AllIconDemo;
