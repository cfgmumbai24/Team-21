import Feedback from '../charts/mentor/Feedback'
import studentFeedbackPieChart from '../charts/students/FeedbackPieChart'
import StudentList from '../charts/mentor/StudentList'
import UpcomingMeetings from '../charts/mentor/UpcomingMeetings'

 const MentorDashboard = () => {
    return (
      <div>
          <Feedback/>
          <studentFeedbackPieChart/>
          <StudentList/>
          <UpcomingMeetings/>
      </div>
    )
  }
  export default MentorDashboard
