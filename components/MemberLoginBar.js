// MemberLoginBar — thin utility bar at the top of every page directing
// existing members to the V2 platform. Sits above the main header so it
// doesn't compete with the primary "Take the Free Test" CTA but remains
// discoverable for returning members.

export default function MemberLoginBar() {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#f4f4f0',
        borderBottom: '1px solid #e5e5e0',
        padding: '8px 16px',
        textAlign: 'center',
        fontSize: '13px',
        color: '#5a5a55',
      }}
    >
      Already a member?{' '}
      <a
        href="https://app.somatictinnitusproject.com/login"
        style={{
          color: '#3a8073',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Log in →
      </a>
    </div>
  );
}
