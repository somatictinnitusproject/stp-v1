/*
  DisclaimerText — small grey box shown on result pages.
  Reminds users this is educational, not medical advice.
*/

export default function DisclaimerText({ children }) {
  return (
    <div className="bg-site border border-line rounded-lg px-6 py-5">
      <p className="text-[13px] text-muted leading-relaxed">
        {children ??
          "The Somatic Tinnitus Project is an educational platform. Nothing on this site constitutes medical advice or clinical diagnosis. Always consult a qualified healthcare professional regarding your tinnitus."}
      </p>
    </div>
  );
}
