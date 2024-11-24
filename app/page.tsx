'use client'; // Asegura que el componente se ejecute en el cliente

import { useState } from 'react';

const Home = () => {
  // Definimos el tipo de cart como un arreglo de objetos de productos
  const [cart, setCart] = useState<Array<{ id: number; name: string; description: string; price: number; image: string; category: string }>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  // Lista de productos (divididos en categorías)
  const products = [
    { id: 1, name: 'Chaqueta de cuero', description: 'Chaqueta de cuero premium para hombre.', price: 150, image: '/images/product1.jpg', category: 'ropa' },
    { id: 2, name: 'Zapatillas deportivas', description: 'Zapatillas cómodas y de alto rendimiento.', price: 90, image: '/images/product2.jpg', category: 'ropa' },
    { id: 3, name: 'Gafas de sol', description: 'Gafas de sol polarizadas para el verano.', price: 50, image: '/images/product3.jpg', category: 'ropa' },
    { id: 4, name: 'Auriculares Bluetooth', description: 'Auriculares de alta calidad con cancelación de ruido.', price: 120, image: '/images/product4.jpg', category: 'objetos' },
    { id: 5, name: 'Smartwatch', description: 'Reloj inteligente con monitoreo de actividad.', price: 200, image: '/images/product5.jpg', category: 'objetos' },
    { id: 6, name: 'Laptop Gaming', description: 'Laptop potente para juegos de alta resolución.', price: 1500, image: '/images/product6.jpg', category: 'objetos' },
    { id: 7, name: 'Cámara 4K', description: 'Cámara profesional con grabación en 4K.', price: 999, image: '/images/product7.jpg', category: 'objetos' },
    { id: 8, name: 'Dron profesional', description: 'Dron con cámara 4K y control remoto avanzado.', price: 700, image: '/images/product8.jpg', category: 'objetos' },
    { id: 9, name: 'Robot aspiradora', description: 'Aspiradora inteligente con navegación automática.', price: 300, image: '/images/product9.jpg', category: 'objetos' },
    { id: 10, name: 'Parlante Bluetooth', description: 'Parlante portátil con sonido surround.', price: 70, image: '/images/product10.jpg', category: 'objetos' },
  ];

  // Filtrar productos según la categoría seleccionada y la búsqueda
  const filteredProducts = products.filter(product =>
    (selectedCategory === 'all' || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Agregar producto al carrito
  const addToCart = (product: { id: number; name: string; description: string; price: number; image: string; category: string }) => {
    setCart([...cart, product]);
  };

  // Eliminar producto del carrito
  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  // Total del carrito
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  // Mostrar el modal de pago
  const handlePayment = (method: string) => {
    setPaymentMethod(method);
    setShowPaymentModal(true);
  };

  // Cerrar el modal de pago
  const closeModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', background: '#222' }}>
      {/* Header con el título */}
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', color: 'white', textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)' }}>
        <h1 style={{ fontSize: '2.5em', textTransform: 'uppercase', color: '#00bcd4' }}>TIENDA BLOP</h1>
        <div style={{ fontSize: '1.2em', color: '#fff' }}>
          <span>Carrito: {cart.length} items</span>
        </div>
      </header>

      {/* Barra de búsqueda */}
      <div style={{ margin: '20px 0', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '15px',
            width: '70%',
            fontSize: '1.2em',
            borderRadius: '30px',
            border: '2px solid #00bcd4',
            backgroundColor: 'transparent',
            color: '#fff',
            textAlign: 'center',
            boxShadow: '0 0 10px rgba(0, 188, 212, 0.5)',
          }}
        />
      </div>

      {/* Botones de categorías */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setSelectedCategory('ropa')}
          style={{
            padding: '10px 20px',
            background: selectedCategory === 'ropa' ? '#ff0099' : '#00bcd4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.2em',
            margin: '0 10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Ropa
        </button>
        <button
          onClick={() => setSelectedCategory('objetos')}
          style={{
            padding: '10px 20px',
            background: selectedCategory === 'objetos' ? '#ff0099' : '#00bcd4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.2em',
            margin: '0 10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Objetos
        </button>
        <button
          onClick={() => setSelectedCategory('all')}
          style={{
            padding: '10px 20px',
            background: selectedCategory === 'all' ? '#ff0099' : '#00bcd4',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.2em',
            margin: '0 10px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
        >
          Todos
        </button>
      </div>

      {/* Lista de productos filtrados */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredProducts.map(product => (
          <div
            key={product.id}
            style={{
              border: '2px solid #00bcd4',
              padding: '20px',
              width: '250px',
              borderRadius: '15px',
              background: '#121212',
              textAlign: 'center',
              boxShadow: '0 0 15px rgba(0, 188, 212, 0.7)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            <h3 style={{ color: '#fff', fontSize: '1.4em' }}>{product.name}</h3>
            <p style={{ color: '#bbb', fontSize: '1.1em' }}>{product.description}</p>
            <p style={{ color: '#ff0099', fontSize: '1.2em' }}>${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              style={{
                padding: '10px 20px',
                background: '#ff0099',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1.1em',
                cursor: 'pointer',
                marginTop: '10px',
                transition: 'background-color 0.3s ease',
              }}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Total del carrito */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '2em' }}>Total: ${getTotal()}</h2>
        <button
          onClick={() => handlePayment('tarjeta')}
          style={{
            padding: '15px 30px',
            background: '#ff0099',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.5em',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            marginTop: '20px',
          }}
        >
          Pagar ahora
        </button>
      </div>

      {/* Modal de pago */}
      {showPaymentModal && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <div style={{
            background: '#fff',
            padding: '40px',
            borderRadius: '15px',
            textAlign: 'center',
            width: '400px',
          }}>
            <h2>Seleccione método de pago</h2>
            <button
              onClick={() => setPaymentMethod('tarjeta')}
              style={{
                padding: '10px 20px',
                background: '#00bcd4',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                margin: '10px 0',
                cursor: 'pointer',
              }}
            >
              Pagar con tarjeta
            </button>
            <button
              onClick={() => setPaymentMethod('central')}
              style={{
                padding: '10px 20px',
                background: '#00bcd4',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                margin: '10px 0',
                cursor: 'pointer',
              }}
            >
              Pagar en una central
            </button>

            {paymentMethod === 'tarjeta' && (
              <div>
                <h3>Introduce los detalles de la tarjeta</h3>
                <input
                  type="text"
                  placeholder="Número de tarjeta"
                  style={{ padding: '10px', margin: '10px 0', width: '100%', borderRadius: '8px', border: '1px solid #ddd' }}
                />
                <input
                  type="text"
                  placeholder="Fecha de vencimiento"
                  style={{ padding: '10px', margin: '10px 0', width: '100%', borderRadius: '8px', border: '1px solid #ddd' }}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  style={{ padding: '10px', margin: '10px 0', width: '100%', borderRadius: '8px', border: '1px solid #ddd' }}
                />
                <button
                  onClick={closeModal}
                  style={{
                    padding: '10px 20px',
                    background: '#ff0099',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    marginTop: '20px',
                  }}
                >
                  Confirmar pago
                </button>
              </div>
            )}
            <button
              onClick={closeModal}
              style={{
                padding: '10px 20px',
                background: '#ff4f77',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                marginTop: '10px',
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
