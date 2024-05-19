import { useMediaQuery } from '@chakra-ui/react'
import { PlanAttributes } from '../../../share/interfaces/planAttribute'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { useColor } from '../../../share/hook/use-color.hook'
import { dayDifference } from '../../../share/constant/functions'
import { AiOutlineDelete } from 'react-icons/ai'

const SinglePlanCard: React.FC<{
  plan: PlanAttributes
  deleteItem: (plan: PlanAttributes) => void
}> = ({ plan, deleteItem }) => {
  const colors = useColor()
  const timeLeft = dayDifference(plan.date)
  const [isSmallerThan768] = useMediaQuery('(max-width: 768px)')
  return (
    <VerticalTimelineElement
      visible={true}
      className='vertical-timeline-element--date'
      contentStyle={{
        background: colors.primaryColor,
        color: '#fff',
      }}
      contentArrowStyle={{ borderRight: '7px solid  #A8A69B' }}
      // date={plan.date}
      iconStyle={{ background: colors.highlight, color: '#fff' }}
      icon={
        <AiOutlineDelete
          color={colors.primaryColor}
          onClick={() => {
            deleteItem(plan)
          }}
        />
      }
    >
      <div style={{ width: isSmallerThan768 ? 100 : 400 }}>
        <h3
          className='vertical-timeline-element-title'
          style={{ fontWeight: 600 }}
        >
          {plan.title}
        </h3>
        {plan.type === 'countdown' ? (
          <p style={{ fontSize: 20, color: colors.highlight }}>
            {timeLeft > 0 ? timeLeft + ' days' : -timeLeft + ' days'}
          </p>
        ) : (
          <p style={{ fontSize: 12 }}>{timeLeft + ' days'}</p>
        )}

        <p style={{ fontSize: 12 }}>{plan.date}</p>
      </div>
    </VerticalTimelineElement>
  )
}

export default SinglePlanCard
