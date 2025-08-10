'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [showVisionModal, setShowVisionModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // 컴포넌트 마운트 시 로컬 스토리지에서 폼 데이터 복원
  useEffect(() => {
    const savedFormData = localStorage.getItem('contactFormData');
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (error) {
        console.error('저장된 폼 데이터 복원 실패:', error);
      }
    }
  }, []);

  // 폼 데이터가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (formData.title || formData.name || formData.email || formData.message) {
      localStorage.setItem('contactFormData', JSON.stringify(formData));
    }
  }, [formData]);

  // 폼 입력 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 폼 데이터 검증
      if (!formData.title.trim() || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error('모든 필드를 입력해주세요.');
      }

      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('올바른 이메일 형식을 입력해주세요.');
      }

      // 이메일 전송을 위한 mailto 링크 생성
      const subject = encodeURIComponent(formData.title);
      const body = encodeURIComponent(`
제목: ${formData.title}
이름/연락처: ${formData.name}
이메일: ${formData.email}

메시지:
${formData.message}
      `);
      
      const mailtoLink = `mailto:jin9503744@jayoung.kr?subject=${subject}&body=${body}`;
      
      // 사용자의 기본 이메일 클라이언트로 이메일 전송 시도
      const emailWindow = window.open(mailtoLink, '_blank');
      
      // 이메일 클라이언트가 열렸는지 확인
      if (emailWindow) {
        setSubmitStatus('success');
        
        // 폼 초기화 및 로컬 스토리지 정리
        setFormData({
          title: '',
          name: '',
          email: '',
          message: ''
        });
        localStorage.removeItem('contactFormData');
        
        // 5초 후 성공 메시지 숨기기
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
      } else {
        // 팝업이 차단된 경우 대체 방법 제공
        throw new Error('이메일 클라이언트를 열 수 없습니다. 팝업 차단을 확인해주세요.');
      }
      
    } catch (error) {
      setSubmitStatus('error');
      console.error('이메일 전송 오류:', error);
      
      // 5초 후 오류 메시지 숨기기
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/10 border-b border-white/20 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <img src="/logo_company.png" alt="자유로운영혼 로고" className="h-12 w-auto" />
              </div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                자유로운영혼
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-white/80 hover:text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/10">홈</a>
                <a href="#about" className="text-white/80 hover:text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/10">회사소개</a>
                <a href="#services" className="text-white/80 hover:text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/10">서비스</a>
                <a href="#portfolio" className="text-white/80 hover:text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/10">포트폴리오</a>
                <a href="#contact" className="text-white/80 hover:text-white px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/10">연락처</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-12">
              <span className="text-white/80 text-xl font-semibold">🚀 혁신적인 IT 솔루션</span>
            </div>
            <div className="mb-12">
              <div className="flex flex-col items-center mb-8">
                <img src="/logo_company.png" alt="자유로운영혼 로고" className="h-32 w-auto mb-6" />
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-12 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                자유로운 영혼으로
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                미래를 만듭니다
              </span>
            </h1>
            <p className="text-2xl md:text-3xl mb-16 max-w-5xl mx-auto text-white/80 leading-relaxed">
              창의적인 아이디어로 고객의 비즈니스 성장을 돕고 누구나 <br/>
              일하고 싶은 회사가 되겠습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <button className="group relative px-12 py-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25">
                <span className="relative z-10">포트폴리오 보기</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-12 py-6 border-2 border-white/30 text-white rounded-full font-bold text-xl transition-all duration-300 hover:bg-white/10 hover:border-white/50 backdrop-blur-sm">
                견적 문의
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-white/80 text-xl font-semibold">💎 회사 소개</span>
            </div>
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              우리는 누구인가요?
            </h2>
            <p className="text-2xl text-white/70 max-w-5xl mx-auto leading-relaxed">
              "자유로운 정신과 개성적, 창조적 사고로 구성원의 역량 극대화!"라는 창업 이념을 바탕으로, 
              ESG 경영 실천을 통한 지속가능한 미래가치 창출을 목표로<br />
              고객의 최고의 파트너가 되겠습니다.
            </p>
          </div>
          
          {/* Company Mission Statement */}
          <div className="mb-24 p-16 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold mb-8 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                자유분방한 정신과 개성적, 창조적 사고로<br />
                <br />
                구성원의 역량을 극대화하는 창조적 기업!
              </h3>
              <div className="text-3xl font-bold text-blue-400 mb-12">
                (주)자유로운영혼은
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-2 flex-shrink-0">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/90 leading-relaxed text-xl">
                      구성원의 창의적 역량을 바탕으로 한 비즈니즈 모델를<br />
                      통하여 체계적인 사업전략을 선정, 꿈이 현실화되는 <br />
                      최고의 기업이되고자 최선을 다하고자 합니다.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mt-2 flex-shrink-0">
                    <span className="text-white font-bold text-lg">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/90 leading-relaxed text-xl">
                      주주, 구성원, 고객의 가치를 통한 투명한 경영으로<br />
                      시장에서 모두가 신뢰 할 수 있는 기업이 되고자<br />
                      최선을 다하고자 합니다.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center items-center">
                <img 
                  src="/logo2.jpg" 
                  alt="로고2" 
                  className="w-80 h-80 rounded-2xl shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20" 
                  style={{
                    filter: 'brightness(1.2) contrast(1.1) saturate(1.3)',
                    mixBlendMode: 'multiply'
                  }}
                />
              </div>
            </div>
          </div>        
          <div className="grid md:grid-cols-3 gap-16">
            <div 
              className="group text-center p-12 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 cursor-pointer"
              onClick={() => setShowPlanModal(true)}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <div className="text-4xl">🎯</div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">계획</h3>
              <p className="text-white/70 leading-relaxed text-lg">
                고객의 비즈니스 가치를 극대화.<br/>
                지속 가능한 성장을 추진.
              </p>
            </div>
            <div 
              className="group text-center p-12 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 cursor-pointer"
              onClick={() => setShowVisionModal(true)}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <div className="text-4xl">👁️</div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">비전</h3>
                <p className="text-white/70 leading-relaxed text-lg">
                  체계적인 전략과 비전수립<br/>
                  2020년 IPO 추진.
                </p>
            </div>
            <div 
              className="group text-center p-12 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 cursor-pointer"
              onClick={() => setShowPerformanceModal(true)}
            >
              <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                <div className="text-4xl">💎</div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">실적</h3>
              <p className="text-white/70 leading-relaxed text-lg">
                정량적인 목표수립.<br/>
                체계적인 실적관리.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ESG Section */}
      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-white/80 text-xl font-semibold">🌱 ESG 경영</span>
            </div>
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              지속가능한 미래를 위한 ESG 경영
            </h2>
            <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              환경, 사회, 지배구조를 고려한 지속가능한 경영으로 미래 가치를 창출합니다.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* ESG Development Timeline */}
            <div className="space-y-10">
              <h3 className="text-4xl font-bold text-white mb-10">ESG 경영 발전 단계</h3>
              <div className="space-y-8">
                {[
                  {
                    period: "2024~2025년",
                    title: "ESG 경영 구체화",
                    description: "ESG 경영 체계 수립 및 기본 정책 확립",
                    color: "from-green-400 to-emerald-500"
                  },
                  {
                    period: "2026~2028년",
                    title: "ESG 경영 고도화",
                    description: "ESG 성과 측정 및 지속적 개선 체계 구축",
                    color: "from-blue-400 to-cyan-500"
                  },
                  {
                    period: "2029~2030년",
                    title: "ESG 경영 완성",
                    description: "지속가능한 미래가치 창출 모델 완성",
                    color: "from-orange-400 to-red-500"
                  }
                ].map((stage, index) => (
                  <div key={index} className="flex items-center space-x-8 p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className={`w-20 h-20 bg-gradient-to-br ${stage.color} rounded-3xl flex items-center justify-center text-white font-bold text-2xl`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-lg text-white/60 mb-2">{stage.period}</div>
                      <h4 className="text-2xl font-bold text-white mb-3">{stage.title}</h4>
                      <p className="text-white/70 text-lg">{stage.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* ESG Goals */}
            <div className="space-y-10">
              <h3 className="text-4xl font-bold text-white mb-10">ESG 세부 목표</h3>
              <div className="space-y-8">
                {[
                  {
                    number: "01",
                    title: "친환경 경영 E(Environment)",
                    description: "친환경에너지의 이용확대 및 기후변화대응 온실가스 감축",
                    color: "from-blue-500 to-cyan-500"
                  },
                  {
                    number: "02",
                    title: "인간중심 가치경영 S(Social)",
                    description: "안전한 근로환경 및 일하기 좋은 기업문화 조성",
                    color: "from-cyan-500 to-teal-500"
                  },
                  {
                    number: "03",
                    title: "신뢰받는 투명경영 G(Governance)",
                    description: "윤리경영 실천 및 지배구조 투명성",
                    color: "from-green-500 to-emerald-500"
                  }
                ].map((goal, index) => (
                  <div key={index} className="group p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center space-x-6 mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${goal.color} rounded-2xl flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300`}>
                        {goal.number}
                      </div>
                      <h4 className="text-2xl font-bold text-white">{goal.title}</h4>
                    </div>
                    <p className="text-white/70 leading-relaxed text-lg">{goal.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-white/80 text-xl font-semibold">🛠️ 전문 서비스</span>
            </div>
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              우리의 서비스
            </h2>
            <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              고객의 다양한 요구사항에 맞는 전문적인 IT 서비스를 제공합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: "💻",
                title: "웹 개발",
                description: "반응형 웹사이트부터 복잡한 웹 애플리케이션까지 최신 기술로 개발합니다.",
                features: ["React, Next.js, Vue.js", "Node.js, Python, Java", "AWS, Azure 클라우드"],
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: "📱",
                title: "모바일 앱",
                description: "iOS, Android 네이티브 앱과 크로스 플랫폼 앱을 개발합니다.",
                features: ["React Native, Flutter", "Swift, Kotlin", "앱스토어 배포 지원"],
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: "🤖",
                title: "AI/ML 솔루션",
                description: "머신러닝과 인공지능 기술을 활용한 비즈니스 솔루션을 제공합니다.",
                features: ["데이터 분석 및 시각화", "예측 모델 개발", "챗봇 및 자동화"],
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: "☁️",
                title: "클라우드 서비스",
                description: "클라우드 인프라 구축과 마이그레이션을 전문적으로 지원합니다.",
                features: ["AWS, Azure, GCP", "컨테이너 및 쿠버네티스", "DevOps 자동화"],
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: "🔒",
                title: "보안 서비스",
                description: "사이버 보안 위협으로부터 비즈니스를 보호합니다.",
                features: ["보안 감사 및 평가", "취약점 분석", "보안 정책 수립"],
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                icon: "📊",
                title: "컨설팅",
                description: "IT 전략 수립부터 프로젝트 관리까지 전문적인 컨설팅을 제공합니다.",
                features: ["IT 전략 수립", "프로젝트 관리", "기술 교육"],
                gradient: "from-pink-500 to-rose-500"
              }
            ].map((service, index) => (
              <div key={index} className="group p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <div className={`w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-3xl">{service.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">{service.title}</h3>
                <p className="text-white/70 mb-8 leading-relaxed text-lg">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-white/60 flex items-center text-lg">
                      <span className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-4"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-white/80 text-xl font-semibold">🎨 포트폴리오</span>
            </div>
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              최근 프로젝트
            </h2>
            <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              고객과 함께 만들어온 성공적인 프로젝트들을 소개합니다.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "E-커머스 플랫폼",
                category: "웹 개발",
                image: "🛒",
                description: "React와 Node.js를 활용한 대규모 E-커머스 플랫폼 구축",
                tech: ["React", "Node.js", "MongoDB", "AWS"]
              },
              {
                title: "AI 챗봇 서비스",
                category: "AI/ML",
                image: "🤖",
                description: "자연어 처리를 활용한 고객 서비스 챗봇 개발",
                tech: ["Python", "TensorFlow", "NLP", "Docker"]
              },
              {
                title: "모바일 뱅킹 앱",
                category: "모바일 앱",
                image: "🏦",
                description: "React Native로 개발한 안전한 모바일 뱅킹 애플리케이션",
                tech: ["React Native", "Firebase", "Biometric", "API"]
              },
              {
                title: "클라우드 마이그레이션",
                category: "클라우드",
                image: "☁️",
                description: "기존 온프레미스 시스템을 AWS로 성공적으로 마이그레이션",
                tech: ["AWS", "Docker", "Kubernetes", "CI/CD"]
              },
              {
                title: "데이터 분석 대시보드",
                category: "데이터",
                image: "📊",
                description: "실시간 데이터 시각화 대시보드 구축",
                tech: ["Vue.js", "D3.js", "Python", "PostgreSQL"]
              },
              {
                title: "IoT 스마트홈 시스템",
                category: "IoT",
                image: "🏠",
                description: "IoT 센서를 활용한 스마트홈 자동화 시스템",
                tech: ["IoT", "MQTT", "React", "Node.js"]
              }
            ].map((project, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105">
                <div className="p-10">
                  <div className="text-5xl mb-6">{project.image}</div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-sm text-white/70 mb-6">
                    {project.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-white/70 mb-8 leading-relaxed text-lg">{project.description}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="px-4 py-2 rounded-full bg-white/10 text-sm text-white/60">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-16 text-center">
            {[
              { number: "150+", label: "완료 프로젝트", icon: "🚀" },
              { number: "50+", label: "만족 고객", icon: "😊" },
              { number: "5년", label: "업계 경험", icon: "⭐" },
              { number: "24/7", label: "고객 지원", icon: "🛡️" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-8xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-white/70 text-2xl">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-white/80 text-xl font-semibold">📞 연락처</span>
            </div>
            <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              함께 일해요
            </h2>
            <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              프로젝트 문의나 협업 제안이 있으시면 언제든 연락주세요.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-10">
              <h3 className="text-4xl font-bold text-white mb-10">회사 정보</h3>
              {[
                { icon: "📍", label: "주소", value: "서울 서초구 남부순환로 2497 호서대창업보육센터 802호" },
                { icon: "📞", label: "전화", value: "070-8211-1831" },
                { icon: "📠", label: "FAX", value: "0503-8379-4573" },
                { icon: "✉️", label: "이메일", value: "jin9503744@jayoung.kr" },
                { icon: "⏰", label: "운영시간", value: "월-금 09:00 - 18:00" }
              ].map((info, index) => (
                <div key={index} className="flex items-start space-x-6 p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl">{info.icon}</div>
                  <div>
                    <div className="font-semibold text-white mb-2 text-xl">{info.label}</div>
                    <div className="text-white/70 text-lg">{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-4xl font-bold text-white mb-10">문의하기</h3>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="제목" 
                    className="w-full px-8 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="이름/연락처" 
                    className="w-full px-8 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                    required
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="이메일" 
                    className="w-full px-8 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                    required
                  />
                </div>
                <div>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="메시지" 
                    rows={8}
                    className="w-full px-8 py-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none text-lg"
                    required
                  ></textarea>
                </div>
                
                {/* 상태 메시지 */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-2xl text-green-400 text-center">
                    ✅ 이메일 클라이언트가 열렸습니다. 메시지를 확인하고 전송해주세요!
                    <br />
                    <span className="text-sm text-green-300">
                      만약 이메일 클라이언트가 열리지 않았다면, 수동으로 jin9503744@jayoung.kr로 메시지를 보내주세요.
                    </span>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-2xl text-red-400 text-center">
                    ❌ 이메일 전송 중 오류가 발생했습니다.
                    <br />
                    <span className="text-sm text-red-300">
                      팝업 차단을 확인하거나, 수동으로 jin9503744@jayoung.kr로 메시지를 보내주세요.
                    </span>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={isSubmitting || !formData.title.trim() || !formData.name.trim() || !formData.email.trim() || !formData.message.trim()}
                  className={`w-full px-12 py-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-3xl font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${
                    isSubmitting ? 'animate-pulse' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      전송 중...
                    </span>
                  ) : (
                    '메시지 보내기'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                중장기 계획
              </h2>
              <button 
                onClick={() => setShowPlanModal(false)}
                className="text-white/60 hover:text-white text-3xl transition-colors duration-300"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">2024년 계획</h3>
                <ul className="space-y-4 text-white/80 text-lg">
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 text-xl">04.</span>
                    <span>법인설립/자본금 (주)자유로운영혼, 대표자, 연구소장, 경영본부 3인, 160,000,000원</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 text-xl">05.</span>
                    <span>기업부설연구소설립</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 text-xl">06.</span>
                    <span>G밸리 협약 (서울경제진흥원)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 text-xl">08.</span>
                    <span>2024 Agri-ESG Innovation 협약 (서울창조경제혁신센터)</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">2025년 계획</h3>
                <ul className="space-y-4 text-white/80 text-lg">
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-400 text-xl">03.</span>
                    <span>초기창업패키지 (창업중심대학/초기창업패키지, 1년/1억)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-400 text-xl">06.</span>
                    <span>특허, 소프트웨어저작권 등록 (중소기업IP 프로그램 활용)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-400 text-xl">09.</span>
                    <span>중소기업 정책자금 (1차) (창업기반지원자금 500,000,000원)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-400 text-xl">12.</span>
                    <span>기업부설연구소 설립 (연구소전담인원 2명 확보)</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">2026년 계획</h3>
                <ul className="space-y-4 text-white/80 text-lg">
                  <li className="flex items-start space-x-3">
                    <span className="text-pink-400 text-xl">06.</span>
                    <span>공장임대 (IOT묘듈과 판넬제작을 위한 임대공장 설립)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-pink-400 text-xl">09.</span>
                    <span>중소기업 정책자금 (2차) (개발기술사업화자금 500,000,000원)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-pink-400 text-xl">12.</span>
                    <span>인증획득 (성능인증) (조달청 수의계약 교두보 마련)</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">2027년 계획</h3>
                <ul className="space-y-4 text-white/80 text-lg">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 text-xl">03.</span>
                    <span>창업도약패키지 (창업중심대학/창업도약패키지, 1년/3억)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 text-xl">-</span>
                    <span>창업성장기술개발 (1차) (R&D, 2년/3년)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 text-xl">12.</span>
                    <span>조달우수획득 (관급공사 수의계약 적극 활용)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 text-xl">-</span>
                    <span>전문건설업 면허획득 (기계설비)</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">2028년 계획</h3>
                <ul className="space-y-4 text-white/80 text-lg">
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-400 text-xl">03.</span>
                    <span>창업성장기술개발 (2차) (R&D, 2년/3년)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-400 text-xl">06.</span>
                    <span>성과공유제 (대·중소기업 공동목표를 달성 성과공유)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-400 text-xl">12.</span>
                    <span>전문건설업 면허획득 (정보통신업)</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">2029년 계획</h3>
                <ul className="space-y-4 text-white/80 text-lg">
                  <li className="flex items-start space-x-3">
                    <span className="text-orange-400 text-xl">03.</span>
                    <span>스케일업 TIPS 프로그램 (매칭투자 20억 유치)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-orange-400 text-xl">12.</span>
                    <span>공장매입 (제품양산을 위한 자체공장 매입)</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">2030년 계획</h3>
                <ul className="space-y-4 text-white/80 text-lg">
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400 text-xl">03.</span>
                    <span>아기아기콘 200억 육성사업 (매칭투자 20억 유치)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-red-400 text-xl">12.</span>
                    <span>IPO 준비 (IPO를 위한 투자유치 준비)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vision Modal */}
      {showVisionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl p-12 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                우리의 비전
              </h2>
              <button 
                onClick={() => setShowVisionModal(false)}
                className="text-white/60 hover:text-white text-3xl transition-colors duration-300"
              >
                ✕
              </button>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left Section: 중장기 주요사업 추진계획 */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white mb-6">중장기 주요사업 추진계획</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-white/80 text-sm">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left p-3">순번</th>
                        <th className="text-left p-3">추진 내용</th>
                        <th className="text-left p-3">추진 기간</th>
                        <th className="text-left p-3">세부 내용</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-2">
                      {[
                        { no: 1, content: "예비창업패키지", period: "2024.04 ~ 2024.12", detail: "예비창업자(1년, 최대 1억)" },
                        { no: 2, content: "법인설립", period: "2024.05", detail: "신규직원 1명 채용" },
                        { no: 3, content: "지적재산권 등록", period: "2024.06", detail: "자본금(50,000,000원)" },
                        { no: 4, content: "중소기업 정책자금", period: "2024.08", detail: "특허, 소프트웨어저작권 등록" },
                        { no: 5, content: "기업부설연구소 설립", period: "2025.03", detail: "중소기업 정책자금 (1차)" },
                        { no: 6, content: "공장임대계약", period: "2025.06", detail: "기업부설연구소 설립" },
                        { no: 7, content: "인증획득", period: "2025.09", detail: "IoT 모듈 생산을 위한 공장임대" },
                        { no: 8, content: "창업성장기술개발", period: "2025.12", detail: "인증획득 (성능인증)" },
                        { no: 9, content: "스케일업 TIPS 프로그램", period: "2026.06", detail: "창업성장기술개발 (1차)" },
                        { no: 10, content: "공장설립", period: "2026.09", detail: "스케일업 TIPS 프로그램" },
                        { no: 11, content: "아기유니콘 200육성사업", period: "2026.12", detail: "공장설립 (자체공장)" },
                        { no: 12, content: "IPO 준비", period: "2027.03 ~ 2027.12", detail: "아기유니콘 200육성사업" },
                        { no: 13, content: "창업성장기술개발 (2차)", period: "2028.12", detail: "IPO 준비" },
                        { no: 14, content: "성과공유제", period: "2029.03 ~ 2029.12", detail: "창업성장기술개발 (2차)" },
                        { no: 15, content: "전문건설업 면허", period: "2030.12", detail: "성과공유제" },
                        { no: 16, content: "조달우수획득", period: "2027.12", detail: "전문건설업 면허획득" },
                        { no: 17, content: "공장매입", period: "2029.12", detail: "조달우수획득" },
                        { no: 18, content: "매칭투자 유치", period: "2029.03", detail: "공장매입" },
                        { no: 19, content: "코스탁등록 준비", period: "2030.03", detail: "매칭투자 20억 유치" },
                        { no: 20, content: "IPO 완료", period: "2030.12", detail: "코스탁등록을 위한 준비" }
                      ].map((item, index) => (
                        <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                          <td className="p-3 font-bold text-purple-400">{item.no}</td>
                          <td className="p-3">{item.content}</td>
                          <td className="p-3 text-blue-400">{item.period}</td>
                          <td className="p-3 text-white/60">{item.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Section: 중장기 사업목표 */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white mb-6">중장기 사업목표</h3>
                
                {/* 창업초기(예비포함) */}
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <h4 className="text-xl font-bold text-white mb-4">창업초기(예비포함)</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-white/80 text-sm">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left p-2">연도</th>
                          <th className="text-left p-2">매출(백만원)</th>
                          <th className="text-left p-2">비용(백만원)</th>
                          <th className="text-left p-2">이익률(%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { year: "2024", sales: 100, cost: 173, profit: -73 },
                          { year: "2025", sales: 500, cost: 755, profit: -51 },
                          { year: "2026", sales: 1500, cost: 1524, profit: -1.6 }
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-white/10">
                            <td className="p-2 font-bold text-green-400">{item.year}</td>
                            <td className="p-2">{item.sales}</td>
                            <td className="p-2">{item.cost}</td>
                            <td className="p-2 text-red-400">{item.profit}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 창업성장기 */}
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <h4 className="text-xl font-bold text-white mb-4">창업성장기</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-white/80 text-sm">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left p-2">연도</th>
                          <th className="text-left p-2">매출(백만원)</th>
                          <th className="text-left p-2">비용(백만원)</th>
                          <th className="text-left p-2">영업이익률(%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { year: "2027", sales: 5000, cost: 4104, profit: 17.92 },
                          { year: "2028", sales: 10000, cost: 7507, profit: 24.93 },
                          { year: "2029", sales: 20000, cost: 13508, profit: 32.46 },
                          { year: "2030", sales: 30000, cost: 20239, profit: 32.42 }
                        ].map((item, index) => (
                          <tr key={index} className="border-b border-white/10">
                            <td className="p-2 font-bold text-green-400">{item.year}</td>
                            <td className="p-2">{item.sales}</td>
                            <td className="p-2">{item.cost}</td>
                            <td className="p-2 text-green-400">{item.profit}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                                      {/* 재무 성과 차트 */}
                      <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <h4 className="text-lg font-bold text-white mb-4">재무 성과 추이</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white/60 text-sm">매출액 (백만원)</span>
                              <span className="text-blue-400 font-bold">100 → 30,000</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000" style={{width: '100%'}}></div>
                            </div>
                            <div className="text-xs text-white/40 text-center">연평균 성장률: 300배</div>
                          </div>

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-white/60 text-sm">영업이익 (백만원)</span>
                              <span className="text-green-400 font-bold">-73 → 10,108</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2 mb-1">
                              <div className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full transition-all duration-1000" style={{width: '100%'}}></div>
                            </div>
                            <div className="text-xs text-white/40 text-center">흑자 전환 및 지속적 성장</div>
                          </div>

                          <div className="pt-2 border-t border-white/10">
                            <div className="grid grid-cols-2 gap-3 text-center">
                              <div className="p-2 bg-white/5 rounded-lg">
                                <div className="text-sm font-bold text-blue-400">7년</div>
                                <div className="text-xs text-white/60">성장 기간</div>
                              </div>
                              <div className="p-2 bg-white/5 rounded-lg">
                                <div className="text-sm font-bold text-green-400">32%</div>
                                <div className="text-xs text-white/60">목표 영업이익률</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                
                {/* Graph Image */}
                <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <h4 className="text-xl font-bold text-white mb-4">상세 그래프</h4>
                  <div className="w-full rounded-lg overflow-hidden">
                    <img
                      src="/Graph.jpg"
                      alt="중장기 사업목표 그래프"
                      className="w-full h-auto rounded-lg"
                      style={{ maxHeight: '400px', objectFit: 'contain' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 실적 모달 */}
      {showPerformanceModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                📊 회사 실적 현황
              </h2>
              <button
                onClick={() => setShowPerformanceModal(false)}
                className="text-white/60 hover:text-white text-3xl transition-colors duration-300"
              >
                ✕
              </button>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* 2024년 실적 */}
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="text-blue-400 mr-3">📅</span>
                  2024년 실적
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2024. 10</div>
                    <div className="text-white font-medium">인공지능 임베디드 플랫폼 조달</div>
                    <div className="text-white/60 text-sm">(국립군산대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2024. 11</div>
                    <div className="text-white font-medium">2024년 육군 노트북 조달</div>
                    <div className="text-white/60 text-sm">(육군군수사령부)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2024. 12</div>
                    <div className="text-white font-medium">데이터수집보드 구매</div>
                    <div className="text-white/60 text-sm">(서울과학기술대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-green-400">
                    <div className="text-sm text-green-400 font-semibold">2024. 12</div>
                    <div className="text-white font-medium">복합환경제어시스템 제작설치</div>
                    <div className="text-white/60 text-sm">(경상북도 영천시 농업기술센터, 4개 스마트팜)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2024. 12</div>
                    <div className="text-white font-medium">광운인공지능고등학교 노트북컴퓨터 조달</div>
                    <div className="text-white/60 text-sm">(서울광운인공지능고등학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-purple-400">
                    <div className="text-sm text-purple-400 font-semibold">2024. 12</div>
                    <div className="text-white font-medium">기계공학전공 P-실무프로젝트 기자재(3D 프린터) 납품</div>
                    <div className="text-white/60 text-sm">(가천대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-purple-400">
                    <div className="text-sm text-purple-400 font-semibold">2024. 12</div>
                    <div className="text-white font-medium">소프트웨어전공 기자재(3D프린터) 납품</div>
                    <div className="text-white/60 text-sm">(가천대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-orange-400">
                    <div className="text-sm text-orange-400 font-semibold">2024. 12</div>
                    <div className="text-white font-medium">통신판매업 등록</div>
                  </div>
                </div>
              </div>

              {/* 2025년 실적 */}
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="text-green-400 mr-3">🚀</span>
                  2025년 실적
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-green-400">
                    <div className="text-sm text-green-400 font-semibold">2025. 01</div>
                    <div className="text-white font-medium">인천가톨릭대학교 ESG 경영 종이없는 행정을 위한 회의용 태블릿PC 및 노트북 구매</div>
                    <div className="text-white/60 text-sm">(인천가톨릭대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 02</div>
                    <div className="text-white font-medium">특허권리이전(냉각장치가 구비된 마스크)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 02</div>
                    <div className="text-white font-medium">삼성 갤럭시북4 프로, 벽걸이TV(75인치), 냉장고(255L) 구매</div>
                    <div className="text-white/60 text-sm">(세종대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-purple-400">
                    <div className="text-sm text-purple-400 font-semibold">2025. 02</div>
                    <div className="text-white font-medium">[혁신] 대학혁신지원사업단 기자재(iPad Air 13 등 20점) 구입</div>
                    <div className="text-white/60 text-sm">(명지전문대)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 02</div>
                    <div className="text-white font-medium">정보자원 관제 모니터링 시스템 구축 계획 및 시행</div>
                    <div className="text-white/60 text-sm">(서일대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 02</div>
                    <div className="text-white font-medium">LG QHD 모니터_학완라우 & 노트북</div>
                    <div className="text-white/60 text-sm">(성균관대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 02</div>
                    <div className="text-white font-medium">모니터(이화여자대학교) / 2025년2월노트북공동구매(한국철도기술연구원) / 모니터(한국기초과학지원연구원)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-green-400">
                    <div className="text-sm text-green-400 font-semibold">2025. 03</div>
                    <div className="text-white font-medium">홀로닉 생산 시스템 모니터링 서버 제어용 태블릿 / 임베디드 시스템 엣지 모듈</div>
                    <div className="text-white/60 text-sm">(한국생산기술연구원)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-green-400">
                    <div className="text-sm text-green-400 font-semibold">2025. 03</div>
                    <div className="text-white font-medium">냉난방기 & 이동식거치대</div>
                    <div className="text-white/60 text-sm">(가천대학교)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 추가 2025년 실적 (4월-7월) */}
            <div className="mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-orange-400 mr-3">📈</span>
                2025년 추가 실적 (4월-7월)
              </h3>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 04</div>
                    <div className="text-white font-medium">MacBook Pro 구매 (명지대학교 산학협력단)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 04</div>
                    <div className="text-white font-medium">Samsung Electronics 노트북, 벽걸이TV(75인치), 냉장고(255L) 구매</div>
                    <div className="text-white/60 text-sm">(세종대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-green-400">
                    <div className="text-sm text-green-400 font-semibold">2025. 04</div>
                    <div className="text-white font-medium">복합환경제어시스템 구매</div>
                    <div className="text-white/60 text-sm">(경상북도 영천시 농업기술센터)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 04</div>
                    <div className="text-white font-medium">노트북컴퓨터 구매 (행정안전부 국립재난안전연구원)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-purple-400">
                    <div className="text-sm text-purple-400 font-semibold">2025. 05</div>
                    <div className="text-white font-medium">특허출원: 모듈형 열에너지 공급장치 및 제어시스템</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-purple-400">
                    <div className="text-sm text-purple-400 font-semibold">2025. 05</div>
                    <div className="text-white font-medium">특허출원: 아쿠아포닉스 시설 및 제어시스템</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 05</div>
                    <div className="text-white font-medium">정보자원 모니터링 시스템 구축</div>
                    <div className="text-white/60 text-sm">(서일대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 05</div>
                    <div className="text-white font-medium">서버 운영체제 라이선스 구매</div>
                    <div className="text-white/60 text-sm">(서울시설공단)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 05</div>
                    <div className="text-white font-medium">TOF 카메라 센서 모듈 구매</div>
                    <div className="text-white/60 text-sm">(한국생산기술연구원)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-green-400">
                    <div className="text-sm text-green-400 font-semibold">2025. 05</div>
                    <div className="text-white font-medium">에어컨 납품설치 (광운대학교)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2025년 6-7월 실적 */}
            <div className="mt-8 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-red-400 mr-3">🔥</span>
                2025년 최신 실적 (6월-7월)
              </h3>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 06</div>
                    <div className="text-white font-medium">월파관측장비 구매설치 (NVIDIA 그래픽 카드)</div>
                    <div className="text-white/60 text-sm">(행정안전부 국립재난안전연구원)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 06</div>
                    <div className="text-white font-medium">GPU NVIDIA A6000_2EA 납품설치</div>
                    <div className="text-white/60 text-sm">(성균관대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-green-400">
                    <div className="text-sm text-green-400 font-semibold">2025. 06</div>
                    <div className="text-white font-medium">LG 천정형 냉난방기 30평 & 40평 납품설치</div>
                    <div className="text-white/60 text-sm">(인하대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 06</div>
                    <div className="text-white font-medium">LG 스탠드 에어컨, 노트북, 태블릿 납품</div>
                    <div className="text-white/60 text-sm">(한림성심대학교, 한국철도기술연구원, 경찰청)</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 07</div>
                    <div className="text-white font-medium">GPU NVIDIA A6000_3EA 납품</div>
                    <div className="text-white/60 text-sm">(연세대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 07</div>
                    <div className="text-white font-medium">연구과제 수행을 위한 기자재 납품</div>
                    <div className="text-white/60 text-sm">(명지대학교 산학협력단)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-green-400">
                    <div className="text-sm text-green-400 font-semibold">2025. 07</div>
                    <div className="text-white font-medium">LG 벽걸이 냉난방기 납품설치</div>
                    <div className="text-white/60 text-sm">(가천대학교)</div>
                  </div>
                  
                  <div className="p-4 bg-white/5 rounded-lg border-l-4 border-blue-400">
                    <div className="text-sm text-blue-400 font-semibold">2025. 07</div>
                    <div className="text-white font-medium">삼성노트북, 애플&LG 노트북, 애플노트북 납품</div>
                    <div className="text-white/60 text-sm">(성균관대학교, 한국기초과학지원연구원, 울산대학교)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-16 mb-16">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
                자유로운영혼
              </div>
              <div className="text-lg text-white/50 mb-6">JAYUROWOONYOUNGHUN INC.</div>
              <p className="text-white/60 leading-relaxed text-lg">
                자유로운 창의성과 혁신적인 기술로 
                미래를 만드는 전문 IT 서비스 회사입니다.
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-white mb-8">서비스</h4>
              <ul className="space-y-4 text-white/60 text-lg">
                <li className="hover:text-white transition-colors duration-300">웹 개발</li>
                <li className="hover:text-white transition-colors duration-300">모바일 앱</li>
                <li className="hover:text-white transition-colors duration-300">AI/ML 솔루션</li>
                <li className="hover:text-white transition-colors duration-300">클라우드 서비스</li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-white mb-8">회사</h4>
              <ul className="space-y-4 text-white/60 text-lg">
                <li className="hover:text-white transition-colors duration-300">회사 소개</li>
                <li className="hover:text-white transition-colors duration-300">포트폴리오</li>
                <li className="hover:text-white transition-colors duration-300">채용</li>
                <li className="hover:text-white transition-colors duration-300">뉴스</li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-white mb-8">연락처</h4>
              <ul className="space-y-4 text-white/60 text-lg">
                <li>서울 서초구 남부순환로 2497</li>
                <li>070-8211-1831</li>
                <li>FAX: 0503-8379-4573</li>
                <li>contact@freemind.co.kr</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 text-center text-white/40 text-lg">
            <p>&copy; 2024 자유로운영혼 주식회사 (JAYUROWOONYOUNGHUN INC.). All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
} 