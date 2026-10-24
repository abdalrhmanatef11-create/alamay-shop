import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [messages, setMessages] = useState([]);
  const [inputMsg, setInputMsg] = useState('');
  
  const [transferNumber, setTransferNumber] = useState('');
  const [receiptImage, setReceiptImage] = useState(null);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const vodafoneCashNumber = '01012859717';

  const coinsProducts = [
    { id: 1, name: '100 عمله', price: 70.00, img: 'https://ibb.co/Qt6CTyK' },
    { id: 2, name: '300 عمله', price: 160.00, img: 'https://ibb.co/Qt6CTyK' },
    { id: 3, name: '500 عمله', price: 250.00, img: 'https://ibb.co/Qt6CTyK' },
    { id: 4, name: '1000 عمله', price: 450.00, img: 'https://ibb.co/Qt6CTyK' },
    { id: 5, name: '1,500 عمله', price: 700.00, img: 'https://ibb.co/Qt6CTyK' },
    { id: 6, name: '2000 عمله', price: 860.00, img: 'https://ibb.co/Qt6CTyK' },
    { id: 7, name: '3000 عمله', price: 1200.00, img: 'https://ibb.co/Qt6CTyK' },
    { id: 8, name: '5000 عمله', price: 1900.00, img: 'https://ibb.co/Qt6CTyK' }
  ];

  const coachesProducts = [
    { id: 101, name: 'جوزيه مورينيو', price: 400.00 },
    { id: 102, name: 'أنطونيو كونتي', price: 400.00 },
    { id: 103, name: 'توموياكي ماكينو', price: 400.00 },
    { id: 104, name: 'يورغن كلوب', price: 400.00 },
    { id: 105, name: 'نيكو كوفاتش', price: 700.00 },
    { id: 106, name: 'ريكاردو رودريغيز', price: 400.00 }
  ];

  const playersProducts = [
    { id: 201, name: 'إيكر كاسياس', price: 150.00 },
    { id: 202, name: 'سواريز + 50 كوينز', price: 70.00 },
    { id: 203, name: 'ليونيل ميسي', price: 780.00 },
    { id: 204, name: 'لامين يامال', price: 780.00 }
  ];

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
    alert(`تمت إضافة "${product.name}" إلى السلة بنجاح!`);
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const sendMessage = () => {
    if (!inputMsg.trim()) return;
    setMessages([...messages, { sender: 'user', text: inputMsg }]);
    setInputMsg('');
  };

  const copyNumber = () => {
    navigator.clipboard.writeText(vodafoneCashNumber);
    alert('تم نسخ رقم فودافون كاش: ' + vodafoneCashNumber);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setReceiptImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmPayment = () => {
    if (!transferNumber) {
      alert('يرجى إدخال رقم التحويل.');
      return;
    }
    if (!receiptImage) {
      alert('يرجى رفع صورة إيصال التحويل.');
      return;
    }
    alert('تم تأكيد الدفع وإرسال الطلب بنجاح!');
    setCart([]);
    setTransferNumber('');
    setReceiptImage(null);
    setShowCheckoutModal(false);
    setActiveTab('home');
    setSelectedCategory(null);
  };

  return (
    <div style={{ direction: 'rtl', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#eef6fc', color: '#1e293b', minHeight: '100vh', paddingBottom: '90px', maxWidth: '480px', margin: '0 auto', boxSizing: 'border-box' }}>
      
      {/* الرئيسية والأقسام الثلاثة */}
      {activeTab === 'home' && !selectedCategory && (
        <div style={{ padding: '15px' }}>
          <h2 style={{ color: '#0f4c81', fontSize: '20px', marginBottom: '15px', fontWeight: 'bold' }}>الأصناف الرئيسية</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
            <div onClick={() => setSelectedCategory('coins')} style={{ background: '#fff', borderRadius: '16px', padding: '20px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>🪙</div>
              <h3 style={{ fontSize: '16px', margin: 0, color: '#0f172a' }}>كوينز اللعبة</h3>
            </div>

            <div onClick={() => setSelectedCategory('coaches')} style={{ background: '#fff', borderRadius: '16px', padding: '20px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>👔</div>
              <h3 style={{ fontSize: '16px', margin: 0, color: '#0f172a' }}>مدربين</h3>
            </div>

            <div onClick={() => setSelectedCategory('players')} style={{ background: '#fff', borderRadius: '16px', padding: '20px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>⚽</div>
              <h3 style={{ fontSize: '16px', margin: 0, color: '#0f172a' }}>لاعبين</h3>
            </div>
          </div>
        </div>
      )}

      {/* عرض تفاصيل القسم المحدد في عمودين */}
      {activeTab === 'home' && selectedCategory && (
        <div style={{ padding: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', gap: '10px' }}>
            <button onClick={() => setSelectedCategory(null)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#0f4c81', fontWeight: 'bold' }}>➔</button>
            <h2 style={{ color: '#0f4c81', fontSize: '18px', margin: 0 }}>
              {selectedCategory === 'coins' ? 'كوينز اللعبة' : selectedCategory === 'coaches' ? 'مدربين' : 'لاعبين'}
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {(selectedCategory === 'coins' ? coinsProducts : selectedCategory === 'coaches' ? coachesProducts : playersProducts).map(item => (
              <div key={item.id} style={{ background: '#fff', borderRadius: '14px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                {selectedCategory === 'coins' && <div style={{ fontSize: '30px', marginBottom: '6px' }}>🪙</div>}
                <h4 style={{ fontSize: '14px', margin: '5px 0', color: '#1e293b' }}>{item.name}</h4>
                <p style={{ color: '#0284c7', fontWeight: 'bold', fontSize: '14px', margin: '4px 0 10px' }}>EGP {item.price.toFixed(2)}</p>
                <button onClick={() => addToCart(item)} style={{ background: '#0f4c81', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', width: '100%', fontSize: '12px', fontWeight: 'bold', marginTop: 'auto' }}>إضافة للسلة 🛒</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* السلة */}
      {activeTab === 'cart' && (
        <div style={{ padding: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
            <h2 style={{ color: '#0f4c81', fontSize: '20px', margin: 0 }}>السلة</h2>
            {cart.length > 0 && (
              <button onClick={() => setCart([])} style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>تفريغ السلة</button>
            )}
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>الدولة: مصر</p>

          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 0', color: '#64748b' }}>السلة فارغة حالياً</div>
          ) : (
            <div style={{ paddingBottom: '70px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ background: '#fff', borderRadius: '14px', padding: '12px', marginBottom: '10px', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.name}</span>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '12px' }}>حذف</button>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>سعر الوحدة: EGP {item.price.toFixed(2)}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#0284c7' }}>إجمالي السطر: EGP {(item.price * item.qty).toFixed(2)}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '2px 8px' }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer', color: '#0284c7' }}>-</button>
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer', color: '#0284c7' }}>+</button>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ position: 'fixed', bottom: '60px', left: 0, right: 0, background: '#fff', padding: '12px 15px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '480px', margin: '0 auto', boxSizing: 'border-box' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>الإجمالي</div>
                  <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0284c7' }}>EGP {totalPrice.toFixed(2)}</div>
                </div>
                <button onClick={() => setShowCheckoutModal(true)} style={{ background: '#0f4c81', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>إتمام الدفع</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* المحادثة والدعم الفني */}
      {activeTab === 'chat' && (
        <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>
            <h2 style={{ color: '#0f4c81', fontSize: '18px', margin: 0 }}>الدعم</h2>
            <span style={{ fontSize: '13px', color: '#64748b' }}>نحن هنا للمساعدة</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {messages.length === 0 ? (
              <div style={{ background: '#fff', borderRadius: '16px', padding: '25px', textAlign: 'center', width: '90%', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid #e2e8f0' }}>
                <div style={{ background: '#e0f2fe', width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: '#0284c7' }}>💬</div>
                <h3 style={{ fontSize: '16px', margin: '0 0 8px', color: '#0f172a' }}>لا توجد رسائل بعد</h3>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>أرسل رسالة لبدء محادثة مع الدعم.</p>
              </div>
            ) : (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', alignSelf: 'flex-start' }}>
                {messages.map((m, idx) => (
                  <div key={idx} style={{ background: '#0f4c81', color: '#fff', padding: '10px 14px', borderRadius: '12px', maxWidth: '80%', alignSelf: 'flex-end', fontSize: '14px' }}>
                    {m.text}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', padding: '8px 12px', borderRadius: '12px', border: '1px solid #e2e8f0', marginTop: '10px' }}>
            <span style={{ color: '#64748b', cursor: 'pointer' }}>&lt;</span>
            <input 
              type="text" 
              placeholder="اكتب رسالة" 
              value={inputMsg} 
              onChange={(e) => setInputMsg(e.target.value)} 
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', background: 'transparent' }} 
            />
            <span style={{ cursor: 'pointer' }}>🖼️</span>
            <span style={{ cursor: 'pointer' }}>😊</span>
          </div>
        </div>
      )}

      {/* صفحة إتمام الدفع */}
      {showCheckoutModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#fff', width: '100%', maxWidth: '480px', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '20px', maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#0f172a' }}>إتمام الدفع</h2>
              <button onClick={() => setShowCheckoutModal(false)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}>✕</button>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#334155', marginBottom: '6px' }}>طريقة الدفع *</label>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #cbd5e1', padding: '10px 12px', borderRadius: '10px' }}>
                <span style={{ fontSize: '14px', color: '#64748b' }}>∨</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>فودافون كاش</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>مصر · EGP</div>
                  </div>
                  <div style={{ background: '#e60000', color: '#fff', width: '24px', height: '24px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 'bold' }}>vodafone</div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', margin: '15px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', direction: 'ltr' }}>
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#334155' }}>{vodafoneCashNumber}</span>
                <button onClick={copyNumber} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                </button>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>حوّل على رقم فودافون كاش ثم ارفع الإيصال.</p>
            </div>

            <div style={{ border: '1px solid #cbd5e1', padding: '12px', borderRadius: '10px', marginBottom: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#64748b' }}>إجمالي الطلب</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#0284c7' }}>EGP {totalPrice.toFixed(2)}</div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#334155', marginBottom: '5px' }}>رقم التحويل *</label>
              <input 
                type="text" 
                placeholder="أدخل رقم التحويل" 
                value={transferNumber} 
                onChange={(e) => setTransferNumber(e.target.value)} 
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '13px', textAlign: 'right', outline: 'none' }} 
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#334155', marginBottom: '5px' }}>صورة التحويل *</label>
              <label style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fff' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                {receiptImage ? (
                  <img src={receiptImage} alt="إيصال" style={{ maxHeight: '90px', borderRadius: '6px' }} />
                ) : (
                  <>
                    <div style={{ background: '#e0f2fe', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </div>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>اضغط لإضافة صورة التحويل</span>
                  </>
                )}
              </label>
            </div>

            <button onClick={handleConfirmPayment} style={{ width: '100%', background: '#0f4c81', color: '#fff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>تأكيد الدفع</button>

          </div>
        </div>
      )}

      {/* شريط التنقل السفلي */}
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-around', padding: '8px 0', maxWidth: '480px', margin: '0 auto', zIndex: 50, boxSizing: 'border-box' }}>
        <button onClick={() => { setActiveTab('home'); setSelectedCategory(null); }} style={{ background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer', color: activeTab === 'home' ? '#0f4c81' : '#64748b', fontSize: '11px' }}>
          <span style={{ fontSize: '18px' }}>🏠</span> الرئيسية
        </button>
        <button onClick={() => setActiveTab('cart')} style={{ background: 'none', border: 'none', display
