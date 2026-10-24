import React, { useState, useEffect } from 'react';
import { supabase } from './supabase.js';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'حزمة سواريز', price: 75, category: 'players' },
    { id: 2, name: 'حزمة ألكانتارا', price: 100, category: 'players' },
    { id: 3, name: 'حزمة كاسياس', price: 150, category: 'players' },
    { id: 4, name: 'حزمة كلوب / كونتي / مورينيو + 50 كوينز', price: 430, category: 'players' },
    { id: 5, name: '100 كوينز', price: 80, category: 'coins'img: 'https://ibb.co/Qt6CTyK'
    },
    { id: 6, name: '500 كوينز', price: 350, category: 'coins'img: 'https://ibb.co/Qt6CTyK'
    },
    { id: 7, name: '1000 كوينز', price: 680, category: 'coins'img: 'https://ibb.co/Qt6CTyK'
    },
    { id: 8, name: '15,000 كوينز', price: 5400, category: 'coins'img: 'https://ibb.co/Qt6CTyK'
    }
  ]);
  const [orders, setOrders] = useState([]);
  const [supportMessages, setSupportMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [notice, setNotice] = useState('');
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setIsAdmin(true);
    }
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: oData } = await supabase.from('orders').select('*');
      if (oData) setOrders(oData);
      const { data: mData } = await supabase.from('support_messages').select('*');
      if (mData) setSupportMessages(mData);
    } catch (e) {
      console.log(e);
    }
  }

  const handleAddProduct = () => {
    if (!newProdName || !newProdPrice) return;
    setProducts([...products, { id: Date.now(), name: newProdName, price: Number(newProdPrice), category: 'coins' }]);
    setNewProdName('');
    setNewProdPrice('');
    setNotice('تمت إضافة المنتج بنجاح!');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    setNotice('تم حذف المنتج!');
  };

  const handleSendSupport = async () => {
    if (!newMsg) return;
    await supabase.from('support_messages').insert([{ body: newMsg, sender: isAdmin ? 'Admin' : 'User' }]);
    setNewMsg('');
    fetchData();
  };

  return (
    <div style={{ direction: 'rtl', fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #2563eb', paddingBottom: '10px' }}>
        <h1 style={{ color: '#38bdf8', margin: 0 }}>ALAMAY SHOP ⚽</h1>
        <button onClick={() => setIsAdmin(!isAdmin)} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
          {isAdmin ? 'العودة للمتجر' : 'لوحة التحكم'}
        </button>
      </header>

      {notice && <div style={{ background: '#16a34a', color: '#fff', padding: '10px', marginTop: '10px', borderRadius: '5px' }}>{notice}</div>}

      {isAdmin ? (
        <main style={{ marginTop: '20px' }}>
          <h2>⚙️ لوحة تحكم الأدمن</h2>
          <section style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3>إضافة منتج جديد</h3>
            <input placeholder="اسم المنتج" value={newProdName} onChange={e => setNewProdName(e.target.value)} style={{ padding: '8px', margin: '5px', borderRadius: '4px' }} />
            <input placeholder="السعر بالجنيه" type="number" value={newProdPrice} onChange={e => setNewProdPrice(e.target.value)} style={{ padding: '8px', margin: '5px', borderRadius: '4px' }} />
            <button onClick={handleAddProduct} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px' }}>إضافة</button>
          </section>

          <section style={{ background: '#1e293b', padding: '15px', borderRadius: '8px' }}>
            <h3>إدارة المنتجات والأسعار</h3>
            {products.map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', padding: '10px 0' }}>
                <span>{p.name} - <b>{p.price} ج.م</b></span>
                <button onClick={() => handleDeleteProduct(p.id)} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>حذف</button>
              </div>
            ))}
          </section>
        </main>
      ) : (
        <main style={{ marginTop: '20px' }}>
          <h2>🛒 المنتجات والعروض</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {products.map(p => (
              <div key={p.id} style={{ background: '#1e293b', padding: '15px', borderRadius: '8px', textAlign: 'center', border: '1px solid #334155' }}>
                <h3>{p.name}</h3>
                <p style={{ color: '#38bdf8', fontSize: '18px', fontWeight: 'bold' }}>{p.price} ج.م</p>
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>الدفع عبر فودافون كاش: 01040230424</p>
              </div>
            ))}
          </div>

          <section style={{ marginTop: '30px', background: '#1e293b', padding: '15px', borderRadius: '8px' }}>
            <h3>💬 الدعم الفني وتيليجرام</h3>
            <p>للتواصل المباشر: <a href="https://t.me/DrEslamMahrous" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>@DrEslamMahrous</a></p>
            <textarea placeholder="اكتب استفسارك هنا..." value={newMsg} onChange={e => setNewMsg(e.target.value)} style={{ width: '100%', height: '60px', borderRadius: '4px', padding: '8px' }}></textarea>
            <button onClick={handleSendSupport} style={{ marginTop: '8px', background: '#2563eb', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '4px' }}>إرسال للادارة</button>
          </section>
        </main>
      )}
    </div>
  );
              }
