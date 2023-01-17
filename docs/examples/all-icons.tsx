import { ThemeType } from "ireact-material-icons-svg/lib/types";
import * as React from "react";
import styled from "styled-components";
import * as IReactMaterialIcons from '../../src/icons'

console.log(styled.div)
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

const allIcons: {
  [key: string]: any;
} = {};

console.log(IReactMaterialIcons)

const AllIconDemo = () => {
  // 当前主题
  const [currentTheme, setCurrentTheme] = React.useState("Outlined");

  // 选择主题
  const handleSelectChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = e.currentTarget.value as ThemeType;
      setCurrentTheme(value);
    },
    []
  );

  // 显示图标列表
  const visibleIconList = React.useMemo(
    () =>
      Object.keys(allIcons).filter((iconName) =>
        iconName.includes(currentTheme)
      ),
    [currentTheme]
  );

  return (
    <div style={{ color: "#555" }}>
      <h1 style={{ textAlign: "center" }}>All Icons</h1>
      <div style={{ textAlign: "center" }}>
        <select
          name="theme-select"
          value={currentTheme}
          onChange={handleSelectChange}
        >
          <option value="Baseline">Baseline</option>
          <option value="Outline">Outline</option>
          <option value="Round">Round</option>
          <option value="Sharp">Sharp</option>
          <option value="TwoTone">TwoTone</option>
        </select>
      </div>
      <Container>
        {visibleIconList.map((iconName) => {
          const Component = allIcons[iconName];
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
