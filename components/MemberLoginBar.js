// MemberLoginBar — discreet member login prompt placed between the page
// header and the main hero content. paddingTop: 0 keeps it flush against
// the Nav with no visible gap.

export default function MemberLoginBar() {
  return (
    <div
      style={{
        width: '100%',
        padding: '6px 16px 10px 16px',
        textAlign: 'center',
        fontSize: '17px',
        color: '#5a5a55',
        backgroundColor: 'transparent',
        borderBottom: '1px solid #e5e5e0',
      }}
    >
      Already a member?{' '}
      <a
        href="https://app.somatictinnitusproject.com/login"
        style={{
          color: '#3a8073',
          fontWeight: 600,
          textDecoration: 'none',
          marginLeft: '4px',
        }}
      >
        Log in →
      </a>
    </div>
  );
}
