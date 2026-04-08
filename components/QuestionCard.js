/*
  QuestionCard — wraps the content of a single question screen.
  Handles the slide-in animation between questions.
  Children are the question body (video, response buttons, nav row).
  Built in: test/[question] step.
*/

export default function QuestionCard({ children }) {
  return (
    <div className="max-w-[600px] mx-auto px-6 pt-10 pb-20 animate-[slideIn_0.3s_ease]">
      {children}
    </div>
  );
}
