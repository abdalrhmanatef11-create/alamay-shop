import React, { useState, useEffect } from 'react';
import supabase from './supabase.js';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([
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
    setProducts([...products, { id: Date.now(), name: newProdName, price: Number(newProdPrice), category: 'coins', img: 'https://ibb.co/Qt6CTyK' }]);
    setNewProdName('');
    setNewProdPrice('');
    setNotice('تم إضافة المنتج بنجاح');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleGetSupport = async () => {
    if (!newMsg) return;
    await supabase.from('support_messages').insert([{ body: newMsg, sender: isAdmin ? 'Admin' : 'User' }]);
    setNewMsg('');
    fetchData();
  };

  return (
    <div style={{ direction: 'rtl', fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f0f2f5', color: '#333', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ddd', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ color: '#0056b3', margin: 0 }}>ALAMAY SHOP ⚽</h1>
        <button onClick={() => setIsAdmin(!isAdmin)} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
          {isAdmin ? 'لوحة المستخدم' : 'لوحة الادمن'}
        </button>
      </header>

      {notice && <div style={{ background: '#10b981', color: '#fff', padding: '10px', marginBottom: '15px', borderRadius: '5px' }}>{notice}</div>}

      {isAdmin ? (
        <div>
          <h2>لوحة التحكم (الادمن)</h2>
          <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>إضافة منتج كوينز جديد</h3>
            <input type="text" placeholder="اسم المنتج" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} style={{ padding: '8px', margin: '5px', width: '200px' }} />
            <input type="number" placeholder="السعر" value={newProdPrice} onChange={(e) => setNewProdPrice(e.target.value)} style={{ padding: '8px', margin: '5px', width: '100px' }} />
            <button onClick={handleAddProduct} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>إضافة</button>
          </div>
          <h3>الطلبات الواردة</h3>
          <ul>
            {orders.map((o, i) => <li key={i}>{JSON.stringify(o)}</li>)}
          </ul>
        </div>
      ) : (
        <div>
          <h2>متجر شحن eFootball 🎮</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
            {products.map(p => (
              <div key={p.id} style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                {p.img && <img src={p.img} alt={p.name} style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '10px' }} />}
                <h3 style={{ margin: '10px 0', fontSize: '18px' }}>{p.name}</h3>
                <p style={{ color: '#e11d48', fontWeight: 'bold', fontSize: '16px' }}>{p.price} جنيه</p>
                <button onClick={() => alert('تم اختيار المنتج بنجاح! تواصل مع الدعم لإتمام الشحن عبر فودافون كاش.')} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', width: '100%', marginTop: 'auto' }}>شحن الآن</button>
                {isAdmin && <button onClick={() => handleDeleteProduct(p.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', marginTop: '5px' }}>حذف</button>}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ marginTop: '40px', background: '#fff', padding: '15px', borderRadius: '8px' }}>
        <h3>الدعم الفني والرسائل</h3>
        <div style={{ maxHeight: '150px', overflowY: 'scroll', marginBottom: '10px', border: '1px solid #eee', padding: '10px' }}>
          {supportMessages.map((m, idx) => (
            <div key={idx} style={{ margin: '5px 0' }}><b>{m.sender}:</b> {m.body}</div>
          ))}
        </div>
        <input type="text" placeholder="اكتب رسالتك للدعم..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)} style={{ padding: '8px', width: '70%', marginLeft: '10px' }} />
        <button onClick={handleGetSupport} style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>إرسال</button>
      </div>
    </div>
  );
}
