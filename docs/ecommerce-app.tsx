import { useState } from 'react';
import { ShoppingCart, Heart, Search, Package, Star, Plus, Minus, X, ArrowLeft, Check, Users, BarChart3, Edit, Trash2, LogOut, Settings, ChevronRight, Mail, Lock, User, MapPin, CreditCard, Truck, Filter, Grid, List, Eye, Tag, Percent, TrendingUp, AlertTriangle, ChevronDown, Clock, Menu } from 'lucide-react';

const initialProducts = [
  { id: 1, name: 'Sony WH-1000XM5', price: 349, originalPrice: 399, category: 'Electronics', image: '🎧', rating: 4.8, reviews: 234, stock: 15, status: 'active', colors: ['Black', 'Silver', 'Blue'], sizes: [], brand: 'Sony', isNew: false, isBestSeller: true },
  { id: 2, name: 'Apple Watch Ultra 2', price: 799, originalPrice: 799, category: 'Electronics', image: '⌚', rating: 4.9, reviews: 567, stock: 8, status: 'active', colors: ['Titanium'], sizes: ['49mm'], brand: 'Apple', isNew: true, isBestSeller: true },
  { id: 3, name: 'Nike Tech Fleece Hoodie', price: 120, originalPrice: 150, category: 'Clothing', image: '👕', rating: 4.6, reviews: 189, stock: 45, status: 'active', colors: ['Black', 'Grey', 'Navy'], sizes: ['S', 'M', 'L', 'XL'], brand: 'Nike', isNew: false, isBestSeller: false },
  { id: 4, name: 'Herman Miller Aeron', price: 1395, originalPrice: 1495, category: 'Furniture', image: '🪑', rating: 4.7, reviews: 312, stock: 3, status: 'active', colors: ['Graphite', 'Mineral'], sizes: ['A', 'B', 'C'], brand: 'Herman Miller', isNew: false, isBestSeller: true },
  { id: 5, name: 'Nike Air Zoom Pegasus 40', price: 130, originalPrice: 130, category: 'Sports', image: '👟', rating: 4.5, reviews: 445, stock: 30, status: 'active', colors: ['White', 'Black', 'Blue'], sizes: ['8', '9', '10', '11', '12'], brand: 'Nike', isNew: true, isBestSeller: false },
  { id: 6, name: 'Atomic Habits', price: 18, originalPrice: 27, category: 'Books', image: '📚', rating: 4.9, reviews: 892, stock: 100, status: 'active', colors: [], sizes: [], brand: 'Penguin', isNew: false, isBestSeller: true },
  { id: 7, name: 'MacBook Pro 14" M3', price: 1999, originalPrice: 1999, category: 'Electronics', image: '💻', rating: 4.9, reviews: 1203, stock: 25, status: 'active', colors: ['Space Gray', 'Silver'], sizes: [], brand: 'Apple', isNew: true, isBestSeller: true },
  { id: 8, name: 'Levi\'s 501 Original', price: 89, originalPrice: 98, category: 'Clothing', image: '👖', rating: 4.4, reviews: 678, stock: 60, status: 'active', colors: ['Indigo', 'Black', 'Light Wash'], sizes: ['30', '32', '34', '36'], brand: 'Levi\'s', isNew: false, isBestSeller: false },
];

const initialCustomers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@email.com', orders: 5, spent: 1249, joined: '2024-01-15', status: 'active' },
  { id: 2, name: 'Mike Chen', email: 'mike@email.com', orders: 3, spent: 847, joined: '2024-02-20', status: 'active' },
  { id: 3, name: 'Emma Wilson', email: 'emma@email.com', orders: 8, spent: 2156, joined: '2023-11-10', status: 'active' },
];

const initialCoupons = [
  { id: 1, code: 'SAVE20', type: 'percentage', value: 20, minOrder: 50, active: true },
  { id: 2, code: 'FREESHIP', type: 'shipping', value: 0, minOrder: 75, active: true },
  { id: 3, code: 'FLAT10', type: 'fixed', value: 10, minOrder: 30, active: false },
];

const categories = ['All', 'Electronics', 'Clothing', 'Furniture', 'Sports', 'Books'];

const reviewsData = [
  { id: 1, user: 'John D.', rating: 5, text: 'Excellent quality, highly recommend!', date: '2024-01-15' },
  { id: 2, user: 'Sarah M.', rating: 4, text: 'Great product, fast shipping.', date: '2024-01-10' },
  { id: 3, user: 'Mike R.', rating: 5, text: 'Perfect, exactly as described.', date: '2024-01-05' },
];

function Badge({ children, variant = 'default' }) {
  const styles = { default: 'bg-neutral-100 text-neutral-600', success: 'bg-emerald-50 text-emerald-600', warning: 'bg-amber-50 text-amber-600', error: 'bg-red-50 text-red-600', primary: 'bg-neutral-900 text-white' };
  return <span className={'px-2.5 py-1 rounded-full text-xs font-medium ' + styles[variant]}>{children}</span>;
}

function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const styles = { primary: 'bg-neutral-900 hover:bg-neutral-800 text-white', secondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900', ghost: 'hover:bg-neutral-100 text-neutral-600', danger: 'bg-red-500 hover:bg-red-600 text-white' };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2', lg: 'px-6 py-3' };
  return <button className={styles[variant] + ' ' + sizes[size] + ' rounded-lg font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-50 ' + className} {...props}>{children}</button>;
}

function Input({ label, icon: Icon, ...props }) {
  return (
    <div className="space-y-1.5">
      {label && <label className="text-sm font-medium text-neutral-700">{label}</label>}
      <div className="relative">
        {Icon && <Icon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />}
        <input className={'w-full py-2.5 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-400 focus:ring-2 focus:ring-neutral-100 ' + (Icon ? 'pl-10 pr-4' : 'px-4')} {...props} />
      </div>
    </div>
  );
}

function Modal({ open, onClose, title, children, size = 'md' }) {
  if (!open) return null;
  var maxW = size === 'lg' ? 'max-w-2xl' : size === 'sm' ? 'max-w-sm' : 'max-w-lg';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className={'relative bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] overflow-auto ' + maxW}>
        <div className="flex items-center justify-between p-6 border-b border-neutral-100 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-semibold text-neutral-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg"><X size={20} /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(function(i) {
        return <Star key={i} size={size} className={i <= rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-200'} />;
      })}
    </div>
  );
}

// ============ AUTH SCREENS ============
function LoginScreen({ onLogin, onSwitchToRegister, onGuestCheckout, isAdmin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    if (isAdmin && email !== 'admin@store.com') { setError('Invalid admin credentials'); return; }
    onLogin({ email: email, name: email.split('@')[0] });
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            {isAdmin ? <Settings size={24} className="text-white" /> : <ShoppingCart size={24} className="text-white" />}
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900">{isAdmin ? 'Admin Login' : 'Welcome back'}</h1>
          <p className="text-neutral-500 mt-1">{isAdmin ? 'Sign in to access dashboard' : 'Sign in to your account'}</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 space-y-4">
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
          <Input label="Email" icon={Mail} type="email" placeholder={isAdmin ? 'admin@store.com' : 'you@example.com'} value={email} onChange={function(e) { setEmail(e.target.value); }} />
          <Input label="Password" icon={Lock} type="password" placeholder="••••••••" value={password} onChange={function(e) { setPassword(e.target.value); }} />
          <Button className="w-full" size="lg" onClick={handleSubmit}>Sign In</Button>
          {!isAdmin && (
            <div className="space-y-3 pt-2">
              <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200"></div></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-neutral-500">or</span></div></div>
              <Button variant="secondary" className="w-full" onClick={onGuestCheckout}>Continue as Guest</Button>
              <p className="text-center text-sm text-neutral-500">Don't have an account? <button onClick={onSwitchToRegister} className="text-neutral-900 font-medium hover:underline">Create one</button></p>
            </div>
          )}
        </div>
        {isAdmin && <p className="text-center text-sm text-neutral-400 mt-4">Demo: admin@store.com / any password</p>}
      </div>
    </div>
  );
}

function RegisterScreen({ onRegister, onSwitchToLogin }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  function handleSubmit() {
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    onRegister({ email: form.email, name: form.name });
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center mx-auto mb-4"><User size={24} className="text-white" /></div>
          <h1 className="text-2xl font-semibold text-neutral-900">Create account</h1>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 space-y-4">
          {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
          <Input label="Full Name" icon={User} placeholder="John Doe" value={form.name} onChange={function(e) { setForm({...form, name: e.target.value}); }} />
          <Input label="Email" icon={Mail} type="email" placeholder="you@example.com" value={form.email} onChange={function(e) { setForm({...form, email: e.target.value}); }} />
          <Input label="Password" icon={Lock} type="password" placeholder="••••••••" value={form.password} onChange={function(e) { setForm({...form, password: e.target.value}); }} />
          <Input label="Confirm Password" icon={Lock} type="password" placeholder="••••••••" value={form.confirm} onChange={function(e) { setForm({...form, confirm: e.target.value}); }} />
          <Button className="w-full" size="lg" onClick={handleSubmit}>Create Account</Button>
          <p className="text-center text-sm text-neutral-500">Already have an account? <button onClick={onSwitchToLogin} className="text-neutral-900 font-medium hover:underline">Sign in</button></p>
        </div>
      </div>
    </div>
  );
}

function RoleSelector({ setRole }) {
  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-neutral-900 mb-3">Welcome</h1>
          <p className="text-neutral-500">Choose how you'd like to continue</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <button onClick={function() { setRole('customer-auth'); }} className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all text-left group">
            <div className="w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-neutral-900 group-hover:text-white transition-colors"><ShoppingCart size={24} /></div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Shop as Customer</h2>
            <p className="text-neutral-500 text-sm mb-4">Browse products, add to cart, and place orders</p>
            <span className="text-neutral-900 font-medium flex items-center gap-1">Continue <ChevronRight size={16} /></span>
          </button>
          <button onClick={function() { setRole('admin-auth'); }} className="bg-white p-8 rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all text-left group">
            <div className="w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-neutral-900 group-hover:text-white transition-colors"><Settings size={24} /></div>
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Admin Dashboard</h2>
            <p className="text-neutral-500 text-sm mb-4">Manage products, orders, and customers</p>
            <span className="text-neutral-900 font-medium flex items-center gap-1">Continue <ChevronRight size={16} /></span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============ SLIDE-OUT CART ============
function SlideOutCart({ open, onClose, cart, updateQty, removeItem, onCheckout }) {
  if (!open) return null;
  var subtotal = cart.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-neutral-100">
          <h2 className="text-lg font-semibold">Cart ({cart.length})</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-12"><ShoppingCart size={48} className="mx-auto text-neutral-200 mb-4" /><p className="text-neutral-400">Your cart is empty</p></div>
          ) : cart.map(function(item) {
            return (
              <div key={item.id + (item.selectedColor || '') + (item.selectedSize || '')} className="flex gap-3 p-3 bg-neutral-50 rounded-xl">
                <span className="text-3xl">{item.image}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-neutral-900 text-sm truncate">{item.name}</h4>
                  {(item.selectedColor || item.selectedSize) && <p className="text-xs text-neutral-400">{[item.selectedColor, item.selectedSize].filter(Boolean).join(' / ')}</p>}
                  <p className="text-sm font-medium">${item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button onClick={function() { updateQty(item.id, -1, item.selectedColor, item.selectedSize); }} className="p-1 hover:bg-neutral-200 rounded"><Minus size={12} /></button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button onClick={function() { updateQty(item.id, 1, item.selectedColor, item.selectedSize); }} className="p-1 hover:bg-neutral-200 rounded"><Plus size={12} /></button>
                  </div>
                </div>
                <button onClick={function() { removeItem(item.id, item.selectedColor, item.selectedSize); }} className="text-neutral-300 hover:text-red-500"><X size={16} /></button>
              </div>
            );
          })}
        </div>
        {cart.length > 0 && (
          <div className="p-4 border-t border-neutral-100 space-y-3">
            <div className="flex justify-between font-semibold"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <Button className="w-full" size="lg" onClick={onCheckout}>Checkout</Button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============ QUICK VIEW MODAL ============
function QuickViewModal({ product, open, onClose, onAddToCart, wishlist, toggleWishlist }) {
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [qty, setQty] = useState(1);

  if (!open || !product) return null;

  function handleAdd() {
    onAddToCart(product, qty, color, size);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Quick View" size="lg">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-neutral-50 rounded-xl flex items-center justify-center p-8">
          <span className="text-7xl">{product.image}</span>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-neutral-400">{product.category}</p>
            <h3 className="text-xl font-semibold text-neutral-900">{product.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={Math.round(product.rating)} />
              <span className="text-sm text-neutral-400">({product.reviews})</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold">${product.price}</span>
            {product.originalPrice > product.price && <span className="text-neutral-400 line-through">${product.originalPrice}</span>}
          </div>
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Color</p>
              <div className="flex gap-2">{product.colors.map(function(c) { return <button key={c} onClick={function() { setColor(c); }} className={'px-3 py-1.5 rounded-lg text-sm border transition-all ' + (color === c ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:border-neutral-300')}>{c}</button>; })}</div>
            </div>
          )}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Size</p>
              <div className="flex gap-2 flex-wrap">{product.sizes.map(function(s) { return <button key={s} onClick={function() { setSize(s); }} className={'px-3 py-1.5 rounded-lg text-sm border transition-all ' + (size === s ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:border-neutral-300')}>{s}</button>; })}</div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-neutral-100 rounded-lg p-1">
              <button onClick={function() { setQty(Math.max(1, qty - 1)); }} className="p-2 hover:bg-white rounded"><Minus size={16} /></button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button onClick={function() { setQty(qty + 1); }} className="p-2 hover:bg-white rounded"><Plus size={16} /></button>
            </div>
            <Button className="flex-1" onClick={handleAdd}>Add to Cart</Button>
            <Button variant="secondary" onClick={function() { toggleWishlist(product.id); }}>
              <Heart size={18} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} className={wishlist.includes(product.id) ? 'text-red-500' : ''} />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ============ CHECKOUT FLOW ============
function CheckoutFlow({ cart, onComplete, onBack, user, applyCoupon, couponDiscount, couponCode }) {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({ firstName: '', lastName: '', address: '', city: '', state: '', zip: '', phone: '' });
  const [payment, setPayment] = useState({ method: 'card', cardNumber: '', cardName: '', expiry: '', cvv: '' });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');

  var subtotal = cart.reduce(function(s, i) { return s + i.price * i.quantity; }, 0);
  var discount = couponDiscount || 0;
  var shippingCost = couponCode === 'FREESHIP' ? 0 : (shippingMethod === 'express' ? 14.99 : (subtotal > 100 ? 0 : 9.99));
  var tax = (subtotal - discount) * 0.08;
  var total = subtotal - discount + shippingCost + tax;

  function handleApplyCoupon() {
    var result = applyCoupon(promoCode, subtotal);
    if (result.error) { setPromoError(result.error); }
    else { setPromoError(''); }
  }

  var steps = [{ num: 1, label: 'Shipping', icon: MapPin }, { num: 2, label: 'Payment', icon: CreditCard }, { num: 3, label: 'Review', icon: Check }];

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900"><ArrowLeft size={20} /> Back</button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-10">
          {steps.map(function(s, idx) {
            var isActive = step === s.num, isComplete = step > s.num;
            return (
              <div key={s.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={'w-10 h-10 rounded-full flex items-center justify-center ' + (isComplete ? 'bg-emerald-500 text-white' : isActive ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-500')}>
                    {isComplete ? <Check size={18} /> : <s.icon size={18} />}
                  </div>
                  <span className={'text-xs mt-2 font-medium ' + (isActive || isComplete ? 'text-neutral-900' : 'text-neutral-400')}>{s.label}</span>
                </div>
                {idx < steps.length - 1 && <div className={'w-16 h-0.5 mx-2 ' + (step > s.num ? 'bg-emerald-500' : 'bg-neutral-200')} />}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 space-y-4">
                <h2 className="text-lg font-semibold">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" value={shipping.firstName} onChange={function(e) { setShipping({...shipping, firstName: e.target.value}); }} />
                  <Input label="Last Name" value={shipping.lastName} onChange={function(e) { setShipping({...shipping, lastName: e.target.value}); }} />
                </div>
                <Input label="Address" value={shipping.address} onChange={function(e) { setShipping({...shipping, address: e.target.value}); }} />
                <div className="grid grid-cols-3 gap-4">
                  <Input label="City" value={shipping.city} onChange={function(e) { setShipping({...shipping, city: e.target.value}); }} />
                  <Input label="State" value={shipping.state} onChange={function(e) { setShipping({...shipping, state: e.target.value}); }} />
                  <Input label="ZIP" value={shipping.zip} onChange={function(e) { setShipping({...shipping, zip: e.target.value}); }} />
                </div>
                <Input label="Phone" value={shipping.phone} onChange={function(e) { setShipping({...shipping, phone: e.target.value}); }} />
                <div className="pt-4 border-t border-neutral-100">
                  <p className="text-sm font-medium mb-3">Shipping Method</p>
                  <div className="space-y-2">
                    <label className={'flex items-center justify-between p-4 border rounded-xl cursor-pointer ' + (shippingMethod === 'standard' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200')}>
                      <div className="flex items-center gap-3">
                        <input type="radio" checked={shippingMethod === 'standard'} onChange={function() { setShippingMethod('standard'); }} />
                        <div><p className="font-medium">Standard (5-7 days)</p></div>
                      </div>
                      <span className="font-medium">{subtotal > 100 ? 'Free' : '$9.99'}</span>
                    </label>
                    <label className={'flex items-center justify-between p-4 border rounded-xl cursor-pointer ' + (shippingMethod === 'express' ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200')}>
                      <div className="flex items-center gap-3">
                        <input type="radio" checked={shippingMethod === 'express'} onChange={function() { setShippingMethod('express'); }} />
                        <div><p className="font-medium">Express (2-3 days)</p></div>
                      </div>
                      <span className="font-medium">$14.99</span>
                    </label>
                  </div>
                </div>
                <Button className="w-full" size="lg" onClick={function() { setStep(2); }} disabled={!shipping.firstName || !shipping.address || !shipping.city}>Continue to Payment</Button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 space-y-4">
                <h2 className="text-lg font-semibold">Payment Method</h2>
                <div className="space-y-2">
                  {['card', 'paypal', 'cod'].map(function(m) {
                    var labels = { card: 'Credit Card', paypal: 'PayPal', cod: 'Cash on Delivery' };
                    return (
                      <label key={m} className={'flex items-center gap-3 p-4 border rounded-xl cursor-pointer ' + (payment.method === m ? 'border-neutral-900 bg-neutral-50' : 'border-neutral-200')}>
                        <input type="radio" checked={payment.method === m} onChange={function() { setPayment({...payment, method: m}); }} />
                        <span className="font-medium">{labels[m]}</span>
                      </label>
                    );
                  })}
                </div>
                {payment.method === 'card' && (
                  <div className="space-y-4 pt-4">
                    <Input label="Card Number" icon={CreditCard} placeholder="4242 4242 4242 4242" value={payment.cardNumber} onChange={function(e) { setPayment({...payment, cardNumber: e.target.value}); }} />
                    <Input label="Name on Card" value={payment.cardName} onChange={function(e) { setPayment({...payment, cardName: e.target.value}); }} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Expiry" placeholder="MM/YY" value={payment.expiry} onChange={function(e) { setPayment({...payment, expiry: e.target.value}); }} />
                      <Input label="CVV" placeholder="123" value={payment.cvv} onChange={function(e) { setPayment({...payment, cvv: e.target.value}); }} />
                    </div>
                  </div>
                )}
                <div className="flex gap-3 pt-4">
                  <Button variant="secondary" onClick={function() { setStep(1); }}>Back</Button>
                  <Button className="flex-1" onClick={function() { setStep(3); }}>Review Order</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 border border-neutral-100 space-y-6">
                <h2 className="text-lg font-semibold">Review Order</h2>
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <div className="flex justify-between mb-2"><h3 className="font-medium flex items-center gap-2"><MapPin size={16} /> Shipping</h3><button onClick={function() { setStep(1); }} className="text-sm text-neutral-500 hover:text-neutral-900">Edit</button></div>
                  <p className="text-sm text-neutral-600">{shipping.firstName} {shipping.lastName}</p>
                  <p className="text-sm text-neutral-600">{shipping.address}, {shipping.city}, {shipping.state} {shipping.zip}</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <div className="flex justify-between mb-2"><h3 className="font-medium flex items-center gap-2"><CreditCard size={16} /> Payment</h3><button onClick={function() { setStep(2); }} className="text-sm text-neutral-500 hover:text-neutral-900">Edit</button></div>
                  <p className="text-sm text-neutral-600">{payment.method === 'card' ? 'Card ending in ' + payment.cardNumber.slice(-4) : payment.method === 'paypal' ? 'PayPal' : 'Cash on Delivery'}</p>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Items ({cart.length})</h3>
                  <div className="space-y-2">
                    {cart.map(function(item) { return <div key={item.id} className="flex items-center gap-3"><span className="text-xl">{item.image}</span><div className="flex-1"><p className="font-medium text-sm">{item.name}</p><p className="text-xs text-neutral-400">Qty: {item.quantity}</p></div><p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p></div>; })}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={function() { setStep(2); }}>Back</Button>
                  <Button className="flex-1" size="lg" onClick={function() { onComplete({ shipping: shipping, total: total }); }}>Place Order • ${total.toFixed(2)}</Button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-neutral-100 sticky top-6 space-y-4">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                {discount > 0 && <div className="flex justify-between text-emerald-600"><span>Discount ({couponCode})</span><span>-${discount.toFixed(2)}</span></div>}
                <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span>{shippingCost === 0 ? 'Free' : '$' + shippingCost.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-neutral-500">Tax</span><span>${tax.toFixed(2)}</span></div>
              </div>
              <div className="border-t border-neutral-100 pt-4 flex justify-between font-semibold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
              <div className="pt-2">
                <p className="text-sm font-medium mb-2">Promo Code</p>
                <div className="flex gap-2">
                  <input type="text" placeholder="Enter code" value={promoCode} onChange={function(e) { setPromoCode(e.target.value.toUpperCase()); }} className="flex-1 px-3 py-2 border border-neutral-200 rounded-lg text-sm" />
                  <Button size="sm" variant="secondary" onClick={handleApplyCoupon}>Apply</Button>
                </div>
                {promoError && <p className="text-xs text-red-500 mt-1">{promoError}</p>}
                {couponCode && !promoError && <p className="text-xs text-emerald-600 mt-1">Code {couponCode} applied!</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============ CUSTOMER APP ============
function CustomerApp({ products, cart, setCart, wishlist, setWishlist, orders, setOrders, onExit, user, coupons }) {
  const [view, setView] = useState('shop');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [quickView, setQuickView] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  function addToCart(product, qty, color, size) {
    var q = qty || 1;
    setCart(function(prev) {
      var key = product.id + '-' + (color || '') + '-' + (size || '');
      var existing = prev.find(function(i) { return (i.id + '-' + (i.selectedColor || '') + '-' + (i.selectedSize || '')) === key; });
      if (existing) return prev.map(function(i) { return (i.id + '-' + (i.selectedColor || '') + '-' + (i.selectedSize || '')) === key ? { ...i, quantity: i.quantity + q } : i; });
      return prev.concat([{ ...product, quantity: q, selectedColor: color, selectedSize: size }]);
    });
    setCartOpen(true);
  }

  function updateQty(id, delta, color, size) {
    setCart(function(prev) { return prev.map(function(i) { return i.id === id && i.selectedColor === color && i.selectedSize === size ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i; }); });
  }

  function removeItem(id, color, size) {
    setCart(function(prev) { return prev.filter(function(i) { return !(i.id === id && i.selectedColor === color && i.selectedSize === size); }); });
  }

  function toggleWishlist(id) {
    setWishlist(function(prev) { return prev.includes(id) ? prev.filter(function(i) { return i !== id; }) : prev.concat([id]); });
  }

  function applyCoupon(code, subtotal) {
    var coupon = coupons.find(function(c) { return c.code === code && c.active; });
    if (!coupon) return { error: 'Invalid coupon code' };
    if (subtotal < coupon.minOrder) return { error: 'Minimum order $' + coupon.minOrder };
    if (coupon.type === 'percentage') { setCouponDiscount(subtotal * coupon.value / 100); }
    else if (coupon.type === 'fixed') { setCouponDiscount(coupon.value); }
    else { setCouponDiscount(0); }
    setCouponCode(code);
    return { success: true };
  }

  function completeOrder(data) {
    var order = { id: Date.now(), items: cart.slice(), total: data.total, date: new Date().toLocaleDateString(), status: 'Processing', shipping: data.shipping, timeline: [{ status: 'Order Placed', date: new Date().toLocaleString() }] };
    setOrders(function(prev) { return [order].concat(prev); });
    setCart([]);
    setCouponCode('');
    setCouponDiscount(0);
    setView('success');
  }

  var cartCount = cart.reduce(function(s, i) { return s + i.quantity; }, 0);
  var filtered = products.filter(function(p) {
    return p.status === 'active' && (category === 'All' || p.category === category) && p.name.toLowerCase().includes(search.toLowerCase()) && p.price >= priceRange[0] && p.price <= priceRange[1];
  });

  if (sortBy === 'price-low') filtered.sort(function(a, b) { return a.price - b.price; });
  else if (sortBy === 'price-high') filtered.sort(function(a, b) { return b.price - a.price; });
  else if (sortBy === 'newest') filtered.sort(function(a, b) { return b.isNew ? 1 : -1; });
  else if (sortBy === 'rating') filtered.sort(function(a, b) { return b.rating - a.rating; });

  var bestSellers = products.filter(function(p) { return p.isBestSeller; }).slice(0, 4);
  var newArrivals = products.filter(function(p) { return p.isNew; }).slice(0, 4);

  if (view === 'checkout') {
    return <CheckoutFlow cart={cart} onComplete={completeOrder} onBack={function() { setView('shop'); }} user={user} applyCoupon={applyCoupon} couponDiscount={couponDiscount} couponCode={couponCode} />;
  }

  if (view === 'success') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"><Check size={40} className="text-emerald-600" /></div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Order Confirmed!</h1>
          <p className="text-neutral-500 mb-8">Thank you for your purchase{user ? ', ' + user.name : ''}!</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={function() { setView('orders'); }}>Track Order</Button>
            <Button variant="secondary" onClick={function() { setView('shop'); }}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'orders') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-neutral-100 px-6 py-4"><button onClick={function() { setView('shop'); }} className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900"><ArrowLeft size={20} /> Back</button></header>
        <main className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-semibold mb-8">Order History</h1>
          {orders.length === 0 ? <div className="text-center py-16"><Package size={48} className="mx-auto text-neutral-200 mb-4" /><p className="text-neutral-400">No orders yet</p></div> : (
            <div className="space-y-4">
              {orders.map(function(order) {
                var statusSteps = ['Processing', 'Shipped', 'Delivered'];
                var currentStep = statusSteps.indexOf(order.status);
                return (
                  <div key={order.id} className="border border-neutral-100 rounded-xl p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div><p className="font-medium">Order #{order.id}</p><p className="text-sm text-neutral-400">{order.date}</p></div>
                      <Badge variant={order.status === 'Delivered' ? 'success' : 'warning'}>{order.status}</Badge>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      {statusSteps.map(function(s, idx) {
                        var isComplete = idx <= currentStep;
                        return (
                          <div key={s} className="flex-1 flex items-center">
                            <div className={'w-3 h-3 rounded-full ' + (isComplete ? 'bg-emerald-500' : 'bg-neutral-200')}></div>
                            {idx < statusSteps.length - 1 && <div className={'flex-1 h-0.5 ' + (idx < currentStep ? 'bg-emerald-500' : 'bg-neutral-200')}></div>}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-2 mb-4">{order.items.slice(0, 4).map(function(item, idx) { return <span key={idx} className="text-xl">{item.image}</span>; })}</div>
                    <div className="flex justify-between pt-4 border-t border-neutral-100"><span className="text-neutral-500">{order.items.length} items</span><span className="font-semibold">${order.total.toFixed(2)}</span></div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    );
  }

  if (view === 'wishlist') {
    var wishlistItems = products.filter(function(p) { return wishlist.includes(p.id); });
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-neutral-100 px-6 py-4"><button onClick={function() { setView('shop'); }} className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900"><ArrowLeft size={20} /> Back</button></header>
        <main className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-semibold mb-8">Wishlist ({wishlistItems.length})</h1>
          {wishlistItems.length === 0 ? <div className="text-center py-16"><Heart size={48} className="mx-auto text-neutral-200 mb-4" /><p className="text-neutral-400">Your wishlist is empty</p></div> : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {wishlistItems.map(function(p) { return (
                <div key={p.id} className="border border-neutral-100 rounded-xl p-4">
                  <div className="text-4xl text-center py-6 bg-neutral-50 rounded-lg mb-3">{p.image}</div>
                  <p className="text-xs text-neutral-400">{p.category}</p>
                  <h3 className="font-medium text-sm mb-2 truncate">{p.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">${p.price}</span>
                    <Button size="sm" onClick={function() { addToCart(p, 1); }}>Add</Button>
                  </div>
                </div>
              ); })}
            </div>
          )}
        </main>
      </div>
    );
  }

  if (view === 'account') {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-neutral-100 px-6 py-4"><button onClick={function() { setView('shop'); }} className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900"><ArrowLeft size={20} /> Back</button></header>
        <main className="max-w-2xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-semibold mb-8">Account Settings</h1>
          <div className="space-y-6">
            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-medium mb-4">Profile</h3>
              <div className="space-y-4">
                <Input label="Name" value={user ? user.name : 'Guest'} disabled />
                <Input label="Email" value={user ? user.email : ''} disabled />
              </div>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-medium mb-4">Saved Addresses</h3>
              <p className="text-neutral-400 text-sm">No saved addresses yet</p>
              <Button variant="secondary" size="sm" className="mt-3">Add Address</Button>
            </div>
            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-medium mb-4">Preferences</h3>
              <label className="flex items-center gap-3"><input type="checkbox" className="rounded" defaultChecked /> <span className="text-sm">Email notifications</span></label>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (view === 'product' && selected) {
    var relatedProducts = products.filter(function(p) { return p.category === selected.category && p.id !== selected.id; }).slice(0, 4);
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-neutral-100 px-6 py-4"><button onClick={function() { setView('shop'); }} className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900"><ArrowLeft size={20} /> Back</button></header>
        <main className="max-w-5xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-neutral-50 rounded-2xl flex items-center justify-center p-12"><span className="text-9xl">{selected.image}</span></div>
            <div className="space-y-6">
              <div>
                <div className="flex gap-2 mb-2">{selected.isNew && <Badge variant="primary">New</Badge>}{selected.isBestSeller && <Badge variant="success">Best Seller</Badge>}</div>
                <p className="text-sm text-neutral-400">{selected.brand} • {selected.category}</p>
                <h1 className="text-2xl font-semibold text-neutral-900 mt-1">{selected.name}</h1>
                <div className="flex items-center gap-3 mt-2"><StarRating rating={Math.round(selected.rating)} /><span className="text-neutral-500">{selected.rating} ({selected.reviews} reviews)</span></div>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-semibold">${selected.price}</span>
                {selected.originalPrice > selected.price && <span className="text-xl text-neutral-400 line-through">${selected.originalPrice}</span>}
                {selected.originalPrice > selected.price && <Badge variant="error">{Math.round((1 - selected.price / selected.originalPrice) * 100)}% OFF</Badge>}
              </div>
              {selected.colors.length > 0 && (
                <div><p className="text-sm font-medium mb-2">Color</p><div className="flex gap-2">{selected.colors.map(function(c) { return <button key={c} onClick={function() { setSelectedColor(c); }} className={'px-4 py-2 rounded-lg border text-sm ' + (selectedColor === c ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200')}>{c}</button>; })}</div></div>
              )}
              {selected.sizes.length > 0 && (
                <div><p className="text-sm font-medium mb-2">Size</p><div className="flex gap-2 flex-wrap">{selected.sizes.map(function(s) { return <button key={s} onClick={function() { setSelectedSize(s); }} className={'px-4 py-2 rounded-lg border text-sm ' + (selectedSize === s ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200')}>{s}</button>; })}</div></div>
              )}
              <div className="flex gap-3 pt-4">
                <Button className="flex-1" size="lg" onClick={function() { addToCart(selected, 1, selectedColor, selectedSize); }}>Add to Cart</Button>
                <Button variant="secondary" size="lg" onClick={function() { toggleWishlist(selected.id); }}><Heart size={20} fill={wishlist.includes(selected.id) ? 'currentColor' : 'none'} className={wishlist.includes(selected.id) ? 'text-red-500' : ''} /></Button>
              </div>
              <p className="text-sm text-neutral-500 flex items-center gap-2"><Truck size={16} /> Free shipping on orders over $100</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-xl font-semibold mb-6">Customer Reviews</h2>
            <div className="space-y-4">
              {reviewsData.map(function(r) { return (
                <div key={r.id} className="border border-neutral-100 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2"><div className="flex items-center gap-2"><span className="font-medium">{r.user}</span><StarRating rating={r.rating} size={12} /></div><span className="text-xs text-neutral-400">{r.date}</span></div>
                  <p className="text-neutral-600 text-sm">{r.text}</p>
                </div>
              ); })}
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">You Might Also Like</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map(function(p) { return (
                  <div key={p.id} onClick={function() { setSelected(p); setSelectedColor(''); setSelectedSize(''); }} className="border border-neutral-100 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all">
                    <div className="text-4xl text-center py-6 bg-neutral-50 rounded-lg mb-3">{p.image}</div>
                    <h3 className="font-medium text-sm mb-1 truncate">{p.name}</h3>
                    <span className="font-semibold">${p.price}</span>
                  </div>
                ); })}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // Shop Home
  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-neutral-900 text-white text-center py-2 text-sm">Free shipping on orders over $100 • Use code <span className="font-semibold">SAVE20</span> for 20% off</div>

      {/* Header */}
      <header className="border-b border-neutral-100 sticky top-0 bg-white z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Store</h1>
          <div className="flex items-center gap-2">
            <button onClick={function() { setView('wishlist'); }} className="p-2 hover:bg-neutral-100 rounded-lg relative"><Heart size={20} className="text-neutral-500" />{wishlist.length > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">{wishlist.length}</span>}</button>
            <button onClick={function() { setView('orders'); }} className="p-2 hover:bg-neutral-100 rounded-lg"><Package size={20} className="text-neutral-500" /></button>
            <button onClick={function() { setCartOpen(true); }} className="p-2 hover:bg-neutral-100 rounded-lg relative"><ShoppingCart size={20} className="text-neutral-500" />{cartCount > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-neutral-900 text-white rounded-full text-xs flex items-center justify-center">{cartCount}</span>}</button>
            {user && <button onClick={function() { setView('account'); }} className="p-2 hover:bg-neutral-100 rounded-lg"><User size={20} className="text-neutral-500" /></button>}
            <button onClick={onExit} className="p-2 hover:bg-neutral-100 rounded-lg ml-2"><LogOut size={20} className="text-neutral-400" /></button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="bg-gradient-to-r from-neutral-900 to-neutral-700 rounded-2xl p-8 md:p-12 mb-10 text-white">
          <Badge variant="warning">New Season</Badge>
          <h2 className="text-3xl md:text-4xl font-semibold mt-4 mb-2">Summer Collection 2024</h2>
          <p className="text-neutral-300 mb-6 max-w-md">Discover our latest arrivals with up to 30% off on selected items</p>
          <Button className="bg-white text-neutral-900 hover:bg-neutral-100">Shop Now <ChevronRight size={18} /></Button>
        </div>

        {/* Best Sellers */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-semibold">Best Sellers</h2><button className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1">View All <ChevronRight size={16} /></button></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {bestSellers.map(function(p) { return (
              <div key={p.id} onClick={function() { setSelected(p); setView('product'); }} className="border border-neutral-100 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all group">
                <div className="relative mb-3">
                  <div className="text-4xl text-center py-6 bg-neutral-50 rounded-lg">{p.image}</div>
                  <button onClick={function(e) { e.stopPropagation(); setQuickView(p); }} className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"><Eye size={14} /></button>
                </div>
                <p className="text-xs text-neutral-400">{p.category}</p>
                <h3 className="font-medium text-sm mb-1 truncate">{p.name}</h3>
                <div className="flex items-center justify-between"><span className="font-semibold">${p.price}</span><StarRating rating={Math.round(p.rating)} size={10} /></div>
              </div>
            ); })}
          </div>
        </section>

        {/* New Arrivals */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6"><h2 className="text-xl font-semibold">New Arrivals</h2><button className="text-sm text-neutral-500 hover:text-neutral-900 flex items-center gap-1">View All <ChevronRight size={16} /></button></div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {newArrivals.map(function(p) { return (
              <div key={p.id} onClick={function() { setSelected(p); setView('product'); }} className="border border-neutral-100 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all group">
                <div className="relative mb-3">
                  <div className="text-4xl text-center py-6 bg-neutral-50 rounded-lg">{p.image}</div>
                  <Badge variant="primary" className="absolute top-2 left-2">New</Badge>
                </div>
                <p className="text-xs text-neutral-400">{p.category}</p>
                <h3 className="font-medium text-sm mb-1 truncate">{p.name}</h3>
                <span className="font-semibold">${p.price}</span>
              </div>
            ); })}
          </div>
        </section>

        {/* All Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">All Products</h2>
            <div className="flex items-center gap-3">
              <select value={sortBy} onChange={function(e) { setSortBy(e.target.value); }} className="px-3 py-2 border border-neutral-200 rounded-lg text-sm">
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Top Rated</option>
              </select>
              <button onClick={function() { setViewMode(viewMode === 'grid' ? 'list' : 'grid'); }} className="p-2 border border-neutral-200 rounded-lg">{viewMode === 'grid' ? <List size={18} /> : <Grid size={18} />}</button>
              <button onClick={function() { setShowFilters(!showFilters); }} className="p-2 border border-neutral-200 rounded-lg lg:hidden"><Filter size={18} /></button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters */}
            <div className={'w-64 shrink-0 space-y-6 ' + (showFilters ? 'block' : 'hidden lg:block')}>
              <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300" size={18} /><input type="text" placeholder="Search..." value={search} onChange={function(e) { setSearch(e.target.value); }} className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-lg" /></div>
              <div><p className="font-medium mb-3">Category</p><div className="space-y-2">{categories.map(function(cat) { return <button key={cat} onClick={function() { setCategory(cat); }} className={'block w-full text-left px-3 py-2 rounded-lg text-sm ' + (category === cat ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100')}>{cat}</button>; })}</div></div>
              <div><p className="font-medium mb-3">Price Range</p><div className="flex items-center gap-2"><input type="number" value={priceRange[0]} onChange={function(e) { setPriceRange([Number(e.target.value), priceRange[1]]); }} className="w-20 px-2 py-1 border border-neutral-200 rounded text-sm" /><span>-</span><input type="number" value={priceRange[1]} onChange={function(e) { setPriceRange([priceRange[0], Number(e.target.value)]); }} className="w-20 px-2 py-1 border border-neutral-200 rounded text-sm" /></div></div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
                {filtered.map(function(p) {
                  if (viewMode === 'list') {
                    return (
                      <div key={p.id} onClick={function() { setSelected(p); setView('product'); }} className="flex gap-4 border border-neutral-100 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all">
                        <div className="text-4xl bg-neutral-50 rounded-lg p-4">{p.image}</div>
                        <div className="flex-1">
                          <p className="text-xs text-neutral-400">{p.category}</p>
                          <h3 className="font-medium mb-1">{p.name}</h3>
                          <StarRating rating={Math.round(p.rating)} size={12} />
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${p.price}</p>
                          <Button size="sm" className="mt-2" onClick={function(e) { e.stopPropagation(); addToCart(p, 1); }}>Add</Button>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div key={p.id} onClick={function() { setSelected(p); setView('product'); }} className="border border-neutral-100 rounded-xl p-4 cursor-pointer hover:shadow-lg transition-all group">
                      <div className="relative mb-3">
                        <div className="text-4xl text-center py-6 bg-neutral-50 rounded-lg">{p.image}</div>
                        <button onClick={function(e) { e.stopPropagation(); toggleWishlist(p.id); }} className={'absolute top-2 right-2 p-1.5 rounded-full ' + (wishlist.includes(p.id) ? 'bg-red-50 text-red-500' : 'bg-white text-neutral-300')}><Heart size={14} fill={wishlist.includes(p.id) ? 'currentColor' : 'none'} /></button>
                        <button onClick={function(e) { e.stopPropagation(); setQuickView(p); }} className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"><Eye size={14} /></button>
                        {p.originalPrice > p.price && <Badge variant="error" className="absolute top-2 left-2">{Math.round((1 - p.price / p.originalPrice) * 100)}% OFF</Badge>}
                      </div>
                      <p className="text-xs text-neutral-400">{p.category}</p>
                      <h3 className="font-medium text-sm mb-1 truncate">{p.name}</h3>
                      <div className="flex items-center justify-between">
                        <div><span className="font-semibold">${p.price}</span>{p.originalPrice > p.price && <span className="text-xs text-neutral-400 line-through ml-1">${p.originalPrice}</span>}</div>
                        <Button size="sm" onClick={function(e) { e.stopPropagation(); addToCart(p, 1); }}><Plus size={14} /></Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {filtered.length === 0 && <p className="text-center text-neutral-400 py-16">No products found</p>}
            </div>
          </div>
        </section>
      </main>

      <SlideOutCart open={cartOpen} onClose={function() { setCartOpen(false); }} cart={cart} updateQty={updateQty} removeItem={removeItem} onCheckout={function() { setCartOpen(false); setView('checkout'); }} />
      <QuickViewModal product={quickView} open={!!quickView} onClose={function() { setQuickView(null); }} onAddToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
    </div>
  );
}

// ============ ADMIN APP ============
function AdminApp({ products, setProducts, orders, setOrders, customers, coupons, setCoupons, onExit, user }) {
  const [tab, setTab] = useState('overview');
  const [modal, setModal] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', category: 'Electronics', stock: '', image: '📦' });
  const [couponForm, setCouponForm] = useState({ code: '', type: 'percentage', value: '', minOrder: '' });

  var emojis = ['📦', '🎧', '⌚', '👕', '🪑', '👟', '📚', '🔊', '💻', '📱', '🎮', '👖'];

  function saveProduct() {
    if (editItem) { setProducts(products.map(function(p) { if (p.id === editItem.id) return { ...p, name: form.name, price: Number(form.price), category: form.category, stock: Number(form.stock), image: form.image }; return p; })); }
    else { setProducts(products.concat([{ id: Date.now(), name: form.name, price: Number(form.price), originalPrice: Number(form.price), category: form.category, stock: Number(form.stock), image: form.image, rating: 4.5, reviews: 0, status: 'active', colors: [], sizes: [], brand: '', isNew: true, isBestSeller: false }])); }
    setModal(null);
  }

  function saveCoupon() {
    if (editItem) { setCoupons(coupons.map(function(c) { if (c.id === editItem.id) return { ...c, code: couponForm.code, type: couponForm.type, value: Number(couponForm.value), minOrder: Number(couponForm.minOrder) }; return c; })); }
    else { setCoupons(coupons.concat([{ id: Date.now(), code: couponForm.code, type: couponForm.type, value: Number(couponForm.value), minOrder: Number(couponForm.minOrder), active: true }])); }
    setModal(null);
  }

  var totalRevenue = orders.reduce(function(s, o) { return s + o.total; }, 0);
  var lowStock = products.filter(function(p) { return p.stock < 10; });

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <button onClick={onExit} className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900"><LogOut size={18} /> Exit</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-2 mb-6 border-b border-neutral-200 overflow-x-auto">
          {['overview', 'products', 'orders', 'customers', 'coupons', 'settings'].map(function(t) { return <button key={t} onClick={function() { setTab(t); }} className={'px-4 py-3 text-sm font-medium capitalize border-b-2 -mb-px whitespace-nowrap ' + (tab === t ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-500')}>{t}</button>; })}
        </div>

        {tab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 border border-neutral-100"><div className="flex items-center gap-3 mb-3"><div className="p-2 bg-emerald-100 rounded-lg"><TrendingUp size={18} className="text-emerald-600" /></div></div><p className="text-2xl font-semibold">${totalRevenue.toFixed(0)}</p><p className="text-sm text-neutral-500">Total Revenue</p></div>
              <div className="bg-white rounded-xl p-5 border border-neutral-100"><div className="flex items-center gap-3 mb-3"><div className="p-2 bg-blue-100 rounded-lg"><Package size={18} className="text-blue-600" /></div></div><p className="text-2xl font-semibold">{orders.length}</p><p className="text-sm text-neutral-500">Total Orders</p></div>
              <div className="bg-white rounded-xl p-5 border border-neutral-100"><div className="flex items-center gap-3 mb-3"><div className="p-2 bg-purple-100 rounded-lg"><ShoppingCart size={18} className="text-purple-600" /></div></div><p className="text-2xl font-semibold">{products.length}</p><p className="text-sm text-neutral-500">Products</p></div>
              <div className="bg-white rounded-xl p-5 border border-neutral-100"><div className="flex items-center gap-3 mb-3"><div className="p-2 bg-amber-100 rounded-lg"><Users size={18} className="text-amber-600" /></div></div><p className="text-2xl font-semibold">{customers.length}</p><p className="text-sm text-neutral-500">Customers</p></div>
            </div>
            {lowStock.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <h3 className="font-medium flex items-center gap-2 text-amber-800 mb-2"><AlertTriangle size={18} /> Low Stock Alert</h3>
                <div className="space-y-1">{lowStock.map(function(p) { return <p key={p.id} className="text-sm text-amber-700">{p.name} - {p.stock} left</p>; })}</div>
              </div>
            )}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-neutral-100">
                <h3 className="font-semibold mb-4">Recent Orders</h3>
                {orders.length === 0 ? <p className="text-neutral-400 text-sm">No orders yet</p> : orders.slice(0, 5).map(function(o) { return <div key={o.id} className="flex justify-between py-3 border-b border-neutral-100 last:border-0"><div><p className="font-medium text-sm">#{o.id}</p><p className="text-xs text-neutral-400">{o.date}</p></div><div className="text-right"><p className="font-medium text-sm">${o.total.toFixed(2)}</p><Badge variant={o.status === 'Delivered' ? 'success' : 'warning'}>{o.status}</Badge></div></div>; })}
              </div>
              <div className="bg-white rounded-xl p-6 border border-neutral-100">
                <h3 className="font-semibold mb-4">Sales Overview</h3>
                <div className="h-40 flex items-end gap-2">
                  {[40, 65, 45, 80, 55, 90, 70].map(function(h, i) { return <div key={i} className="flex-1 bg-neutral-900 rounded-t" style={{ height: h + '%' }}></div>; })}
                </div>
                <div className="flex justify-between text-xs text-neutral-400 mt-2"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>
              </div>
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div className="bg-white rounded-xl border border-neutral-100">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100"><h3 className="font-semibold">Products ({products.length})</h3><Button onClick={function() { setEditItem(null); setForm({ name: '', price: '', category: 'Electronics', stock: '', image: '📦' }); setModal('product'); }}><Plus size={16} /> Add</Button></div>
            <div className="divide-y divide-neutral-100">
              {products.map(function(p) { return (
                <div key={p.id} className="flex items-center gap-4 p-4">
                  <span className="text-2xl">{p.image}</span>
                  <div className="flex-1 min-w-0"><h4 className="font-medium truncate">{p.name}</h4><p className="text-sm text-neutral-400">{p.category}</p></div>
                  <div className="text-right mr-4"><p className="font-medium">${p.price}</p><p className={'text-sm ' + (p.stock < 10 ? 'text-amber-600' : 'text-neutral-400')}>{p.stock} in stock</p></div>
                  <button onClick={function() { setEditItem(p); setForm({ name: p.name, price: String(p.price), category: p.category, stock: String(p.stock), image: p.image }); setModal('product'); }} className="p-2 hover:bg-neutral-100 rounded-lg"><Edit size={16} /></button>
                  <button onClick={function() { setProducts(products.filter(function(x) { return x.id !== p.id; })); }} className="p-2 hover:bg-red-50 rounded-lg text-neutral-400 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              ); })}
            </div>
          </div>
        )}

        {tab === 'orders' && (
          <div className="bg-white rounded-xl border border-neutral-100">
            <div className="p-5 border-b border-neutral-100"><h3 className="font-semibold">Orders ({orders.length})</h3></div>
            {orders.length === 0 ? <p className="p-5 text-neutral-400">No orders</p> : orders.map(function(o) { return (
              <div key={o.id} className="flex items-center gap-4 p-4 border-b border-neutral-100">
                <div className="flex-1"><p className="font-medium">#{o.id}</p><p className="text-sm text-neutral-400">{o.date} • {o.items.length} items</p></div>
                <p className="font-medium mr-4">${o.total.toFixed(2)}</p>
                <select value={o.status} onChange={function(e) { setOrders(orders.map(function(x) { return x.id === o.id ? { ...x, status: e.target.value } : x; })); }} className="px-3 py-1.5 bg-neutral-100 rounded-lg text-sm"><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select>
              </div>
            ); })}
          </div>
        )}

        {tab === 'customers' && (
          <div className="bg-white rounded-xl border border-neutral-100">
            <div className="p-5 border-b border-neutral-100"><h3 className="font-semibold">Customers ({customers.length})</h3></div>
            {customers.map(function(c) { return (
              <div key={c.id} className="flex items-center gap-4 p-4 border-b border-neutral-100">
                <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center font-medium">{c.name.charAt(0)}</div>
                <div className="flex-1"><p className="font-medium">{c.name}</p><p className="text-sm text-neutral-400">{c.email}</p></div>
                <div className="text-right"><p className="font-medium">${c.spent}</p><p className="text-sm text-neutral-400">{c.orders} orders</p></div>
                <Badge variant={c.status === 'active' ? 'success' : 'error'}>{c.status}</Badge>
              </div>
            ); })}
          </div>
        )}

        {tab === 'coupons' && (
          <div className="bg-white rounded-xl border border-neutral-100">
            <div className="flex items-center justify-between p-5 border-b border-neutral-100"><h3 className="font-semibold">Coupons</h3><Button onClick={function() { setEditItem(null); setCouponForm({ code: '', type: 'percentage', value: '', minOrder: '' }); setModal('coupon'); }}><Plus size={16} /> Add</Button></div>
            {coupons.map(function(c) { return (
              <div key={c.id} className="flex items-center gap-4 p-4 border-b border-neutral-100">
                <div className="p-2 bg-neutral-100 rounded-lg"><Percent size={18} /></div>
                <div className="flex-1"><p className="font-medium font-mono">{c.code}</p><p className="text-sm text-neutral-400">{c.type === 'percentage' ? c.value + '% off' : c.type === 'fixed' ? '$' + c.value + ' off' : 'Free shipping'} • Min ${c.minOrder}</p></div>
                <Badge variant={c.active ? 'success' : 'default'}>{c.active ? 'Active' : 'Inactive'}</Badge>
                <button onClick={function() { setCoupons(coupons.map(function(x) { return x.id === c.id ? { ...x, active: !x.active } : x; })); }} className="p-2 hover:bg-neutral-100 rounded-lg text-sm">{c.active ? 'Disable' : 'Enable'}</button>
              </div>
            ); })}
          </div>
        )}

        {tab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-neutral-100">
              <h3 className="font-semibold mb-4">General</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Store Name" defaultValue="My Store" />
                <div><label className="text-sm font-medium text-neutral-700 block mb-1.5">Currency</label><select className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg"><option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option></select></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-100">
              <h3 className="font-semibold mb-4">Shipping</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg"><span>Standard Shipping</span><span className="font-medium">$9.99</span></div>
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg"><span>Express Shipping</span><span className="font-medium">$14.99</span></div>
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg"><span>Free Shipping Threshold</span><span className="font-medium">$100</span></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-neutral-100">
              <h3 className="font-semibold mb-4">Tax</h3>
              <Input label="Tax Rate (%)" defaultValue="8" type="number" />
            </div>
          </div>
        )}
      </div>

      <Modal open={modal === 'product'} onClose={function() { setModal(null); }} title={editItem ? 'Edit Product' : 'Add Product'}>
        <div className="space-y-4">
          <Input label="Name" value={form.name} onChange={function(e) { setForm({...form, name: e.target.value}); }} />
          <div className="grid grid-cols-2 gap-4"><Input label="Price" type="number" value={form.price} onChange={function(e) { setForm({...form, price: e.target.value}); }} /><Input label="Stock" type="number" value={form.stock} onChange={function(e) { setForm({...form, stock: e.target.value}); }} /></div>
          <div><label className="text-sm font-medium text-neutral-700 block mb-1.5">Category</label><select value={form.category} onChange={function(e) { setForm({...form, category: e.target.value}); }} className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg">{categories.slice(1).map(function(c) { return <option key={c}>{c}</option>; })}</select></div>
          <div><label className="text-sm font-medium text-neutral-700 block mb-2">Icon</label><div className="flex flex-wrap gap-2">{emojis.map(function(e) { return <button key={e} onClick={function() { setForm({...form, image: e}); }} className={'text-xl p-2 rounded-lg ' + (form.image === e ? 'bg-neutral-900' : 'hover:bg-neutral-100')}>{e}</button>; })}</div></div>
          <Button className="w-full" onClick={saveProduct}>{editItem ? 'Save' : 'Add Product'}</Button>
        </div>
      </Modal>

      <Modal open={modal === 'coupon'} onClose={function() { setModal(null); }} title="Add Coupon">
        <div className="space-y-4">
          <Input label="Code" value={couponForm.code} onChange={function(e) { setCouponForm({...couponForm, code: e.target.value.toUpperCase()}); }} placeholder="SAVE20" />
          <div><label className="text-sm font-medium text-neutral-700 block mb-1.5">Type</label><select value={couponForm.type} onChange={function(e) { setCouponForm({...couponForm, type: e.target.value}); }} className="w-full px-4 py-2.5 border border-neutral-200 rounded-lg"><option value="percentage">Percentage Off</option><option value="fixed">Fixed Amount</option><option value="shipping">Free Shipping</option></select></div>
          {couponForm.type !== 'shipping' && <Input label="Value" type="number" value={couponForm.value} onChange={function(e) { setCouponForm({...couponForm, value: e.target.value}); }} placeholder={couponForm.type === 'percentage' ? '20' : '10'} />}
          <Input label="Minimum Order" type="number" value={couponForm.minOrder} onChange={function(e) { setCouponForm({...couponForm, minOrder: e.target.value}); }} placeholder="50" />
          <Button className="w-full" onClick={saveCoupon}>Create Coupon</Button>
        </div>
      </Modal>
    </div>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [authView, setAuthView] = useState('login');
  const [products, setProducts] = useState(initialProducts);
  const [customers] = useState(initialCustomers);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orders, setOrders] = useState([]);

  function handleLogin(userData) { setUser(userData); if (role === 'customer-auth') setRole('customer'); if (role === 'admin-auth') setRole('admin'); }
  function handleGuestCheckout() { setUser({ name: 'Guest', email: '' }); setRole('customer'); }
  function handleExit() { setRole(null); setUser(null); setAuthView('login'); }

  if (!role) return <RoleSelector setRole={setRole} />;
  if (role === 'customer-auth') {
    if (authView === 'register') return <RegisterScreen onRegister={handleLogin} onSwitchToLogin={function() { setAuthView('login'); }} />;
    return <LoginScreen onLogin={handleLogin} onSwitchToRegister={function() { setAuthView('register'); }} onGuestCheckout={handleGuestCheckout} isAdmin={false} />;
  }
  if (role === 'admin-auth') return <LoginScreen onLogin={handleLogin} isAdmin={true} />;
  if (role === 'admin') return <AdminApp products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} customers={customers} coupons={coupons} setCoupons={setCoupons} onExit={handleExit} user={user} />;
  return <CustomerApp products={products} cart={cart} setCart={setCart} wishlist={wishlist} setWishlist={setWishlist} orders={orders} setOrders={setOrders} onExit={handleExit} user={user} coupons={coupons} />;
}
