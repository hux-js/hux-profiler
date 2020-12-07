import styled from 'styled-components'

export const MainHeader = styled.div`
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
  margin-bottom: 1rem;
  font-size: 12px;
  color: #964193;
  line-height: 12px;
`

export const Header = styled.div`
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
  margin-bottom: 0;
  font-size: 11px;
  margin-top: 1rem;
`

export const EventView = styled.div`
  padding: 1rem;
  overflow-y: scroll;
  height: calc(100% - 80px);
  font-size: 12px;
  line-height: 25px;
  position: relative;
`

export const Select = styled.select`
  background: #293238;
  color: ${(props) =>
    props.selectedBucket === 'default' ? '#68757d' : 'white'};
  padding: 1rem calc(1rem - 4px);
  border: 0;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 11px;

  &.light {
    border: 1px solid #293238;
    border-radius: 3px;
    background: white;
    color: #293238;
    margin-top: 1rem;
    padding: 10px;
    margin-left: 8px;
    max-width: 130px;
  }
`
