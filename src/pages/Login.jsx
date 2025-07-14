import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth();

    if (isLogin) {
      // LOGIN
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        navigate('/'); // Redirect to dashboard
      } catch (error) {
        alert(`❌ Login failed: ${error.message}`);
      }
    } else {
      // SIGNUP
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        setLoading(false);
        return;
      }

      try {
        const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const uid = userCred.user.uid;

        await setDoc(doc(db, 'users', uid), {
          name: formData.name,
          email: formData.email,
          createdAt: new Date()
        });

        navigate('/'); // Redirect to dashboard after signup
      } catch (error) {
        alert(`❌ Signup failed: ${error.message}`);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#072D44] via-[#064469] to-[#5790AB] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="mb-8 text-center animate-fadeInUp">
          <div className="flex justify-center mb-4">
            <svg width="80" height="80" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce">
              <path fillRule="evenodd" clipRule="evenodd" d="M50.1074 34.0095C52.9382 33.3578 55.5057 32.3028 57.3227 30.0463C59.0196 27.938 59.7454 25.1615 60.0581 21.8336C62.4939 22.5841 64.3718 24.3024 65.83 26.9801C67.5861 30.206 68.6773 34.788 69.0147 40.5138C59.2072 39.6383 52.3408 45.0415 50.6192 51.6792H42.4658L39.5 57.2174L36.5342 51.6792H28.3807C26.6592 45.0415 19.7928 39.6383 9.98527 40.5138C10.321 34.788 11.4139 30.206 13.17 26.9818C14.6282 24.3007 16.5061 22.5841 18.9419 21.832C19.2546 25.1615 19.9804 27.938 21.6773 30.0447C23.4877 32.2962 26.0453 33.3512 28.8663 34.0029L28.4449 30.4907C23.6457 29.0786 22.2401 26.3564 22.0344 18.1042C21.7656 18.1042 21.5006 18.1108 21.2395 18.1239C20.4011 18.165 19.5681 18.2823 18.751 18.4745C11.0238 20.3129 7.24167 28.8827 6.66233 41.0356C6.60936 42.1688 6.58302 43.3031 6.58333 44.4375C7.72883 44.1456 8.82715 43.9427 9.87829 43.8285C19.8915 42.711 25.5104 49.161 25.5104 54.9708H34.5625L39.5 64.1875L44.4375 54.9708H53.4896C53.4896 49.161 59.1085 42.711 69.1234 43.8285C70.1734 43.9427 71.2712 44.1456 72.4167 44.4375C72.4167 43.2744 72.3903 42.1405 72.3377 41.0356C71.7616 28.8827 67.9762 20.3145 60.249 18.4745C59.4319 18.2823 58.5989 18.165 57.7605 18.1239C57.4957 18.1109 57.2307 18.1043 56.9656 18.1042C56.7582 26.3432 55.3592 29.0704 50.5765 30.4841L50.1074 34.0095Z" fill="#D0D7E1"/>
            </svg>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-[#D0D7E1]">Noctify</h1>
          <p className="text-[#9CCDDB]">Your smart companion for daily life</p>
        </div>

        {/* Login/Signup Form */}
        <div className="p-8 shadow-2xl bg-[#D0D7E1]/95 backdrop-blur-sm rounded-3xl animate-fadeInScale">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                isLogin 
                  ? 'bg-[#072D44] text-[#D0D7E1] shadow-lg transform scale-105' 
                  : 'text-[#064469] hover:bg-[#9CCDDB]/30'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                !isLogin 
                  ? 'bg-[#072D44] text-[#D0D7E1] shadow-lg transform scale-105' 
                  : 'text-[#064469] hover:bg-[#9CCDDB]/30'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="animate-slideInDown">
                <label className="block mb-2 text-sm font-medium text-[#072D44]">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#5790AB] focus:ring-2 focus:ring-[#072D44] focus:border-transparent transition-all duration-200 hover:shadow-md bg-white"
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block mb-2 text-sm font-medium text-[#072D44]">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-[#5790AB] focus:ring-2 focus:ring-[#072D44] focus:border-transparent transition-all duration-200 hover:shadow-md bg-white"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-[#072D44]">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border border-[#5790AB] focus:ring-2 focus:ring-[#072D44] focus:border-transparent transition-all duration-200 hover:shadow-md bg-white"
                placeholder="Enter your password"
                required
              />
            </div>

            {!isLogin && (
              <div className="animate-slideInDown">
                <label className="block mb-2 text-sm font-medium text-[#072D44]">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-[#5790AB] focus:ring-2 focus:ring-[#072D44] focus:border-transparent transition-all duration-200 hover:shadow-md bg-white"
                  placeholder="Confirm your password"
                  required={!isLogin}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#072D44] to-[#064469] text-[#D0D7E1] py-3 px-4 rounded-xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#064469]">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#072D44] font-medium hover:underline transition-colors duration-200"
              >
                {isLogin ? 'Sign up' : 'Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;