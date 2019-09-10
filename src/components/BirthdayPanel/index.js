import BirthdayPanel from './BirthdayPanel'
import { Query } from "react-apollo"
//import { CALENDARENTRIES } from "../../queries"

/*
class CalenderWithoutData extends React.Component {
  render() {
    const {t, selectedDay, setSelectedDay} = this.props
    return (
      <Query
        notifyOnNetworkStatusChange={true}
        query={CALENDARENTRIES}
        variables={{
          day: selectedDay,
        }}
      >
        {({ data, loading, error, fetchMore }) => {
          return (<Calender
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            data={data && data.calendarEntries ? data.calendarEntries.data : []}
            t={t}
          />)
        }}
      </Query>
    );
  }
}
*/

export default BirthdayPanel;
