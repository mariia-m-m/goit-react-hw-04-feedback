import { useState } from 'react';
import FeedbackOptions from './modules/FeedbackMenu/FeedbackOptions';
import Statistics from './modules/FeedbackMenu/Statistics';
import SectionTitle from './modules/FeedbackMenu/SectionTitle';
import Notification from './modules/FeedbackMenu/Notification';
import styles from './modules/FeedbackMenu/feedbackMenu.module.css';

export const App = () => {
  const [feedbacks, setFeedbacks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const leaveFeedback = name => {
    setFeedbacks(prevState => {
      const value = prevState[name];
      return { ...prevState, [name]: value + 1 };
    });
  };

  const total = feedbacks.good + feedbacks.neutral + feedbacks.bad;

  const countPositiveFeedbackPercentage = propName => {
    if (!total) {
      return 0;
    }
    const value = feedbacks[propName];
    const result = ((value / total) * 100).toFixed(2);
    return Number(result);
  };

  const positiveTotal = () => {
    return (
      countPositiveFeedbackPercentage('good') +
      countPositiveFeedbackPercentage('neutral')
    ).toFixed(2);
  };

  const countFeedbackByName = propName => {
    if (!total) {
      return 0;
    }
    const value = feedbacks[propName];
    return value;
  };

  const goodTotal = countFeedbackByName('good');
  const neutralTotal = countFeedbackByName('neutral');
  const badTotal = countFeedbackByName('bad');

  return (
    <div className={styles.wrapper}>
      <SectionTitle title="Please leave feedback">
        <FeedbackOptions onLeaveFeedback={leaveFeedback} />
      </SectionTitle>
      <SectionTitle title="Statistics">
        <Notification message="There is no feedback" total={total} />
        <Statistics
          good={goodTotal}
          neutral={neutralTotal}
          bad={badTotal}
          total={total}
          positivePercentage={positiveTotal()}
        />
      </SectionTitle>
    </div>
  );
};
