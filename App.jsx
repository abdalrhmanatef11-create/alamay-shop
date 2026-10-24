import React, { useState } from 'react';

export default function App() {
  const [products] = useState([
    { id: 1, name: 'شحن حزمة سواريز', price: 75, category: 'players' },
    { id: 2, name: 'شحن حزمة ألكانتارا', price: 100, category: 'players' },
    { id: 3, name: 'شحن حزمة كاسياس', price: 150, category: 'players' },
    { id: 4, name: 'حزمة كلوب + 50 كوينز', price: 430, category: 'coaches' },
    { id: 5, name: 'حزمة كونتي + 50 كوينز', price: 430, category: 'coaches' },
    { id: 6, name: 'حزمة مورينيو + 50 كوينز', price: 430, category: 'coaches' },
    { id: 7, name: '100 كوينز', price: 80, category: 'coins', img: 'https://ibb.co/Qt6CTyK' },
    { id: 8, name: '300 كوينز', price: 220, category: 'coins', img: 'https://ibb.co/Qt6CTyK' },
    { id: 9, name: '500 كوينز', price: 350, category: 'coins', img: 'https://ibb.co/Qt6CTyK' },
    { id: 10, name: '1000 كوينز', price: 680, category: 'coins', img: 'https://ibb.co/Qt6CTyK' },
    { id: 11, name: '1500 كوينز', price: 950, category: 'coins', img: 'https://ibb.co/Qt6CTyK' },
    { id: 12, name: '2000 كوينز', price: 1250, category: 'coins', img: 'https://ibb.co/Qt6CTyK' },
    { id: 13, name: '3000 كوينز', price: 1800, category: 'coins', img: 'https://ibb.co/Qt6CTyK' },
    { id: 14, name: '5000 كوينز', price: 2900, category: 'coins', img: 'https://ibb.co/Qt6CTyK' },
    { id: 15, name: '10,000 كوينز', price: 3800, category: 'coins', img: 'https://ibb.co/Qt6CTyK' },
    { id: 16, name: '15,000 كوينز', price: 5400, category: 'coins', img: 'https://ibb.co/Qt6CTyK' }
  ]);

  const [cart, setCart] = useState([]);
  const [transferNumber, setTransferNumber] = useState('');
  const [receiptImage, setReceiptImage] = useState(null);
  const [notice, setNotice] = useState('');
  
  // رقم فودافون كاش الخاص بك (تقدر تغيره في أي وقت)
  const vodafoneCashNumber = '01012859717';

  const addToCart = (product) => {
    setCart([...cart, product]);
    setNotice(`تم إضافة "${product.name}" إلى السلة!`);
    setTimeout(() => setNotice(''), 2500);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const copyVodafoneNumber = () => {
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
    if (cart.length === 0) {
      alert('السلة فارغة! يرجى إضافة منتجات أولاً.');
      return;
    }
    if (!transferNumber) {
      alert('يرجى إدخال رقم التحويل.');
      return;
    }
    if (!receiptImage) {
      alert('يرجى رفع صورة إيصال التحويل.');
      return;
    }
    alert('تم تأكيد الدفع بنجاح! جاري مراجعة الطلب والشحن فوراً.');
    setCart([]);
    setTransferNumber('');
    setReceiptImage(null);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const renderSection = (title, category) => {
    const items = products.filter(p => p.category === category);
    return (
      <div style={{ marginBottom: '35px' }}>
        <h2 style={{ color: '#0f4c81', borderBottom: '2px solid #0f4c81', paddingBottom: '8px', marginBottom: '15px', fontSize: '20px' }}>{title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {items.map(p => (
            <div key={p.id} style={{ background: '#fff', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {p.img && <img src={p.img} alt={p.name} style={{ width: '45px', height: '45px', objectFit: 'contain', marginBottom: '8px' }} />}
              <h3 style={{ margin: '6px 0', fontSize: '15px', color: '#1e293b' }}>{p.name}</h3>
              <p style={{ color: '#0284c7', fontWeight: 'bold', fontSize: '15px', margin: '4px 0 10px' }}>{p.price} EGP</p>
              <button onClick={() => addToCart(p)} style={{ background: '#0f4c81', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', width: '100%', marginTop: 'auto', fontSize: '13px', fontWeight: 'bold' }}>شحن 🛒</button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ direction: 'rtl', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '15px', backgroundColor: '#f8fafc', color: '#0f172a', minHeight: '100vh', maxWidth: '480px', margin: '0 auto' }}>
      
      {/* هيدر المتجر */}
      <header style={{ textAlign: 'center', marginBottom: '20px', padding: '10px 0' }}>
        <h1 style={{ color: '#0f4c81', margin: 0, fontSize: '24px' }}>ALAMAY SHOP ⚽</h1>
      </header>

      {notice && <div style={{ background: '#10b981', color: '#fff', padding: '10px', marginBottom: '15px', borderRadius: '8px', textAlign: 'center', fontSize: '14px' }}>{notice}</div>}

      {/* أقسام المنتجات (عمودين) */}
      {renderSection('🎮 حزم اللاعبين', 'players')}
      {renderSection('👔 حزم المدربين', 'coaches')}
      {renderSection('🪙 فئات الكوينز', 'coins')}

      {/* كارت سلة المنتجات المحددة */}
      {cart.length > 0 && (
        <div style={{ background: '#fff', padding: '15px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 10px', color: '#0f4c81' }}>المنتجات المحددة ({cart.length}):</h4>
          {cart.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', fontSize: '14px' }}>
              <span>{item.name}</span>
              <div>
                <span style={{ fontWeight: 'bold', color: '#0284c7', marginLeft: '10px' }}>{item.price} EGP</span>
                <button onClick={() => removeFromCart(idx)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= واجهة إتمام الدفع (مطابقة للصورة) ================= */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', marginTop: '20px' }}>
        
        <h2 style={{ textAlign: 'center', color: '#0f172a', margin: '0 0 20px', fontSize: '22px', fontWeight: 'bold' }}>إتمام الدفع</h2>

        {/* طريقة الدفع */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#334155', fontWeight: '500' }}>
            طريقة الدفع <span style={{ color: '#0284c7' }}>*</span>
          </label>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #cbd5e1', padding: '12px 15px', borderRadius: '12px', background: '#fff' }}>
            <span style={{ fontSize: '18px', color: '#64748b' }}>∨</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#0f172a' }}>فودافون كاش</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>مصر · EGP</div>
              </div>
              <div style={{ background: '#e60000', color: '#fff', width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '10px' }}>
                vodafone
              </div>
            </div>
          </div>
        </div>

        {/* رقم التحويل ونسخ الرقم */}
        <div style={{ textAlign: 'center', margin: '15px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', direction: 'ltr' }}>
            <span style={{ fontSize: '17px', fontWeight: 'bold', color: '#334155', letterSpacing: '0.5px' }}>{vodafoneCashNumber}</span>
            <button onClick={copyVodafoneNumber} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} title="نسخ الرقم">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', marginTop: '6px' }}>حوّل على رقم فودافون كاش ثم ارفع الإيصال.</p>
        </div>

        {/* إجمالي الطلب */}
        <div style={{ border: '1px solid #cbd5e1', padding: '15px', borderRadius: '12px', marginBottom: '15px', textAlign: 'center', background: '#fff' }}>
          <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>إجمالي الطلب</div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#0284c7' }}>EGP {totalPrice.toFixed(2)}</div>
        </div>

        {/* رقم التحويل */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#334155', fontWeight: '500' }}>
            رقم التحويل <span style={{ color: '#0284c7' }}>*</span>
          </label>
          <input 
            type="text" 
            placeholder="أدخل رقم التحويل" 
            value={transferNumber} 
            onChange={(e) => setTransferNumber(e.target.value)} 
            style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1px solid #cbd5e1', boxSizing: 'border-box', fontSize: '14px', textAlign: 'right', outline: 'none' }} 
          />
        </div>

        {/* صورة التحويل */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', color: '#334155', fontWeight: '500' }}>
            صورة التحويل <span style={{ color: '#0284c7' }}>*</span>
          </label>
          <label style={{ border: '1px solid #cbd5e1', borderRadius: '12px', padding: '25px 15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#fff' }}>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            {receiptImage ? (
              <img src={receiptImage} alt="صورة التحويل" style={{ maxHeight: '100px', borderRadius: '8px' }} />
            ) : (
              <>
                <div style={{ background: '#e0f2fe', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <polyline points="21 15 16 10 5 21"/>
                    <line x1="12" y1="8" x2="12" y2="14"/>
                    <line x1="9" y1="11" x2="15" y2="11"/>
                  </svg>
                </div>
                <span style={{ fontSize: '13px', color: '#64748b' }}>اضغط لإضافة صورة التحويل</span>
              </>
            )}
          </label>
        </div>

        {/* زر تأكيد الدفع */}
        <button 
          onClick={handleConfirmPayment} 
          style={{ width: '100%', background: '#0f4c81', color: '#fff', border: 'none', padding: '14px', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(15,76,129,0.25)' }}
        >
          تأكيد الدفع
        </button>

      </div>

    </div>
  );
      }
            
