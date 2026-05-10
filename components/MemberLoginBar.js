// MemberLoginBar — discreet member login prompt placed between the page
// header and the main hero content. Visually quiet enough not to compete
// with the primary "Take the Free Test" CTA, but discoverable for returning
// members. Centered, spaced for mobile-first display.

export default function MemberLoginBar() {
  return (
    <div
      style={{
        width: '100%',
        padding: '20px 16px',
        textAlign: 'center',
        fontSize: '15px',
        color: '#5a5a55',
        backgroundColor: 'transparent',
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
