import { useState } from 'react'

// 角色专属天地寄语
const roleSpecificBlessings = {
  entrepreneur: {
    3: '我愿意相信，每一次尝试和探索都在为我铺路，失败只是通往成功的另一种方式。',
    5: '我正走进我人生中最富足、最平衡、最富有、最成功的阶段；我自然而然地吸引好运，我的财富不仅仅体现在金钱上；我允许自己繁荣昌盛，并且我有力量去打造我所渴望的生活。',
    7: '我正在突破自我限制，勇敢面对市场的挑战，每一份坚持都让我更接近真正的自由与创造。',
    9: '你已蜕变为真正的大企业家，你的坚持与创造让梦想化为现实。💯 你会得到自己想要的，并且拥有影响世界的力量。'
  },
  practitioner: {
    3: '我愿意安住当下，哪怕是最细微的呼吸，也能带来宁静与觉察。',
    5: '我正在进入我生命中最平衡、最清明、最安定的阶段；我自然而然吸引内在的智慧与外在的和谐，我允许自己心境澄明，并有力量活出真实的自己。',
    7: '我正在蜕变为更宽容、更慈悲、更自由的自己，每一次放下都让我更轻盈。',
    9: '你已圆满修行，心境清明如水，内外合一。💯 你会得到内心的安宁、智慧与自由，并自然拥有丰盛的生命。'
  },
  elder: {
    3: '我愿意静默守候，每一次观察和体悟，都是生命最真实的见证。',
    5: '我正在进入生命中最宁静、最智慧、最自在的阶段；我自然而然吸引洞察与真知，我允许自己安然不争，却能影响无数心灵。',
    7: '我正在蜕变为超越自我的存在，每一次沉默都蕴含无尽的力量与智慧。',
    9: '你已成为静默中的智者，无需名声，也无需证明。💯 你会得到超越时间的洞察与永恒的安稳，留下无形的传承。'
  },
  mentor: {
    3: '我愿意点亮自己，以此成为他人的一盏灯，即使微弱，也能照亮前路。',
    5: '我正在进入我生命中最充实、最有影响力的阶段；我自然而然吸引弟子、伙伴与机会，我允许自己分享智慧，并且我有力量去启发他人。',
    7: '我正在蜕变为一个真正的引路人，每一句话、每一个行动都能成为他人心中的火种。',
    9: '你已成为无数人的明灯，你的经验与智慧点燃了后来的道路。💯 你会得到生命的圆满意义，因为你的光芒已被延续。'
  }
}

// 圆满终局标题
const completionTitles = {
  entrepreneur: '大企业家',
  practitioner: '得道者', 
  elder: '智者',
  mentor: '明灯'
}

const roles = {
  entrepreneur: {
    id: 'entrepreneur',
    name: '创业者 Entrepreneur',
    icon: '🚀',
    description: '敢于冒险，勇于创新，在商业世界中寻找机遇的先锋者'
  },
  practitioner: {
    id: 'practitioner',
    name: '修行人 Practitioner',
    icon: '🧘‍♂️',
    description: '追求内心平静，通过修行达到身心灵和谐的智者'
  },
  elder: {
    id: 'elder',
    name: '无名老僧 Elder',
    icon: '🙏',
    description: '历经沧桑，拥有深厚智慧，超脱世俗的得道高人'
  },
  mentor: {
    id: 'mentor',
    name: '导师 Mentor',
    icon: '🌟',
    description: '启发他人，传授知识，帮助别人实现梦想的引路人'
  }
}

const tails = [
  { id: 0, name: '通', meaning: '通达万物' },
  { id: 1, name: '灵', meaning: '灵性觉醒' },
  { id: 2, name: '静', meaning: '心如止水' },
  { id: 3, name: '正', meaning: '正道而行' },
  { id: 4, name: '觉', meaning: '觉悟人生' },
  { id: 5, name: '光', meaning: '智慧之光' },
  { id: 6, name: '精', meaning: '精神升华' },
  { id: 7, name: '气', meaning: '浩然正气' },
  { id: 8, name: '神', meaning: '神通广大' }
]

function App() {
  const [gameState, setGameState] = useState('role-selection') // 'role-selection', 'nine-tails', 'blessing'
  const [selectedRole, setSelectedRole] = useState(null)
  const [litTails, setLitTails] = useState([])
  const [tailWishes, setTailWishes] = useState({})
  const [currentBlessing, setCurrentBlessing] = useState('')
  const [showBlessingModal, setShowBlessingModal] = useState(false)
  const [selectedTailForWish, setSelectedTailForWish] = useState(null)
  const [wishText, setWishText] = useState('')

  const handleRoleSelect = (role) => {
    setSelectedRole(role)
    setGameState('nine-tails')
  }

  const handleTailClick = (tailId) => {
    if (litTails.includes(tailId)) return
    setSelectedTailForWish(tailId)
    setWishText('')
  }

  const handleWishSubmit = () => {
    if (!wishText.trim() || selectedTailForWish === null) return

    const newLitTails = [...litTails, selectedTailForWish]
    setLitTails(newLitTails)
    setTailWishes(prev => ({
      ...prev,
      [selectedTailForWish]: wishText.trim()
    }))

    // Reset wish input
    setSelectedTailForWish(null)
    setWishText('')

    // Check for blessing milestones
    const litCount = newLitTails.length
    
    if (roleSpecificBlessings[selectedRole.id] && roleSpecificBlessings[selectedRole.id][litCount]) {
      setCurrentBlessing(roleSpecificBlessings[selectedRole.id][litCount])
      setShowBlessingModal(true)
    }
  }

  const handleWishCancel = () => {
    setSelectedTailForWish(null)
    setWishText('')
  }

  const resetGame = () => {
    setGameState('role-selection')
    setSelectedRole(null)
    setLitTails([])
    setTailWishes({})
    setCurrentBlessing('')
    setShowBlessingModal(false)
  }

  const BlessingModal = () => {
    const isCompletion = litTails.length === 9
    const completionTitle = isCompletion ? completionTitles[selectedRole.id] : null
    
    return (
      <div className="blessing-modal" onClick={() => setShowBlessingModal(false)}>
        <div className="blessing-content" onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            {isCompletion ? '🌕' : '✨'}
          </div>
          
          {isCompletion && (
            <div style={{ marginBottom: '1rem' }}>
              <h2 className="title-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                圆满修行终局
              </h2>
              <h3 className="subtitle-text" style={{ fontSize: '1.8rem', color: '#FFD93D', marginBottom: '1rem' }}>
                🎉 {completionTitle} 🎉
              </h3>
            </div>
          )}
          
          {!isCompletion && (
            <h3 className="title-text" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              获得天启寄语
            </h3>
          )}
          
          <p className="blessing-text mb-6">
            {currentBlessing}
          </p>
          <div className="description-text mb-4">
            已点亮 {litTails.length} 条灵尾
          </div>
          <button 
            className="mystic-button"
            onClick={() => setShowBlessingModal(false)}
          >
            {isCompletion ? '修行圆满 🌟' : '继续修行之路'}
          </button>
        </div>
      </div>
    )
  }

  if (gameState === 'role-selection') {
    return (
      <div className="container">
        <div className="ancient-card p-8" style={{ maxWidth: '1200px', width: '100%' }}>
          <div className="text-center mb-8">
            <h1 className="title-text">
              🐱 九命山海录
            </h1>
            <h2 className="subtitle-text mb-6">Nine Lives Shanhai Chronicle</h2>
            <p className="description-text" style={{ maxWidth: '800px', margin: '0 auto' }}>
              择其道，修其行，点亮九条灵尾。每当你许下心愿并点亮灵尾，天地便会赐予你专属的玄妙寄语
            </p>
            <div className="description-text mt-4" style={{ fontSize: '1rem', fontStyle: 'italic' }}>
              "A cat has nine lives — 在九命公社，每条尾巴代表一次人生和境遇的修炼"
            </div>
          </div>

          <div className="roles-grid">
            {Object.values(roles).map((role) => (
              <div
                key={role.id}
                onClick={() => handleRoleSelect(role)}
                className="ancient-card role-card p-6"
              >
                <div className="text-center">
                  <div className="role-icon">
                    {role.icon}
                  </div>
                  <h3 className="title-text" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    {role.name}
                  </h3>
                  <p className="description-text mb-6">
                    {role.description}
                  </p>
                  <div className="mystic-button">
                    入此道途
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (gameState === 'nine-tails') {
    return (
      <div style={{ minHeight: '100vh', padding: '2rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div className="ancient-card p-6 mb-8">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ fontSize: '3rem' }}>{selectedRole.icon}</div>
                <div>
                  <h2 className="title-text" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                    {selectedRole.name}
                  </h2>
                  <p className="description-text">
                    已点亮 {litTails.length}/9 条灵尾
                  </p>
                </div>
              </div>
              <button 
                onClick={resetGame}
                className="mystic-button"
                style={{ fontSize: '1rem', padding: '10px 20px' }}
              >
                重启修行
              </button>
            </div>
          </div>

          {/* Nine Tails Grid */}
          <div className="ancient-card p-8">
            <h3 className="title-text text-center mb-8">
              九尾灵修 · Nine Tails Spiritual Cultivation
            </h3>
            
            <div className="tails-grid">
              {tails.map((tail) => (
                <div 
                  key={tail.id}
                  className="text-center"
                >
                  <div
                    onClick={() => handleTailClick(tail.id)}
                    className={`tail-button ${
                      litTails.includes(tail.id) ? 'lit' : ''
                    }`}
                    style={{ margin: '0 auto 1rem auto' }}
                  >
                    <span>
                      {tail.name}
                    </span>
                  </div>
                  <p className="description-text mb-4" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    {tail.meaning}
                  </p>
                  {tailWishes[tail.id] && (
                    <div className="ancient-card" style={{ padding: '0.75rem', marginTop: '0.5rem', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                      <p className="description-text" style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
                        "{tailWishes[tail.id]}"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Wish Input Form */}
            {selectedTailForWish !== null && (
              <div className="wish-form-container mt-8">
                <div className="ancient-card p-6" style={{ maxWidth: '500px', margin: '0 auto' }}>
                  <div className="text-center mb-4">
                    <h4 className="title-text" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>
                      许下心愿 🌟
                    </h4>
                    <p className="description-text mb-4">
                      为「{tails[selectedTailForWish].name} · {tails[selectedTailForWish].meaning}」写下你的修行心愿
                    </p>
                  </div>
                  
                  <textarea
                    value={wishText}
                    onChange={(e) => setWishText(e.target.value)}
                    placeholder="在此写下你的心愿或自我寄语..."
                    className="wish-textarea"
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '1rem',
                      borderRadius: '15px',
                      border: '2px solid rgba(255, 215, 0, 0.3)',
                      background: 'rgba(139, 69, 19, 0.2)',
                      color: '#E6E6FA',
                      fontSize: '1.1rem',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      marginBottom: '1.5rem',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                      onClick={handleWishSubmit}
                      disabled={!wishText.trim()}
                      className="mystic-button"
                      style={{ 
                        opacity: wishText.trim() ? 1 : 0.5,
                        cursor: wishText.trim() ? 'pointer' : 'not-allowed'
                      }}
                    >
                      点亮灵尾 ✨
                    </button>
                    <button
                      onClick={handleWishCancel}
                      className="cancel-button"
                      style={{
                        background: 'rgba(160, 160, 160, 0.3)',
                        border: '2px solid rgba(160, 160, 160, 0.5)',
                        color: '#D3D3D3',
                        padding: '12px 24px',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      取消
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="description-text mb-6" style={{ fontSize: '1.2rem' }}>
                点击灵尾许下心愿，每点亮数条便可获得天地寄语
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <span className="blessing-text" style={{ fontSize: '1rem' }}>🌟 三尾: 初心寄语</span>
                <span className="blessing-text" style={{ fontSize: '1rem' }}>🔥 五尾: 成长寄语</span>
                <span className="blessing-text" style={{ fontSize: '1rem' }}>👑 七尾: 蜕变寄语</span>
                <span className="blessing-text" style={{ fontSize: '1rem' }}>🌕 九尾: 圆满寄语</span>
              </div>
            </div>
          </div>

          {/* Wishes Display */}
          {Object.keys(tailWishes).length > 0 && (
            <div className="ancient-card p-6 mt-8">
              <h4 className="title-text mb-6" style={{ fontSize: '1.5rem' }}>
                心愿录 📜
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                {Object.entries(tailWishes).map(([tailId, wish]) => (
                  <div key={tailId} className="ancient-card p-6">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <span style={{ 
                        width: '12px', 
                        height: '12px', 
                        backgroundColor: '#FFD93D', 
                        borderRadius: '50%',
                        animation: 'tailGlow 2s ease-in-out infinite alternate'
                      }}></span>
                      <span className="subtitle-text" style={{ fontSize: '1.1rem' }}>
                        {tails[tailId].name} · {tails[tailId].meaning}
                      </span>
                    </div>
                    <p className="description-text" style={{ fontStyle: 'italic' }}>"{wish}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {showBlessingModal && <BlessingModal />}
      </div>
    )
  }

  return null
}

export default App
