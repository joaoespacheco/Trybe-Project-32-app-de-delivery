import PropTypes from 'prop-types';
import { FaTrashAlt } from 'react-icons/fa';

export default function OrderTable({ productOrders, removeItem, page }) {
  let tableHeader = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total',
  ];
  if (page === 'customer_checkout') {
    tableHeader = [...tableHeader, 'Remover Item'];
  }

  return (
    <table className="orderTable-container">
      <thead className="orderTable-container-head">
        <tr>
          {tableHeader.map((description, index) => (
            <th key={ index }>{description}</th>
          ))}
        </tr>
      </thead>
      <tbody className="orderTable-container-body">
        {productOrders.map((itemCart, index) => (
          <tr
            key={ itemCart.id }
          >
            <td
              data-testid={
                `${page}__element-order-table-item-number-${index}`
              }
            >
              {index + 1}
            </td>
            <td
              data-testid={ `${page}__element-order-table-name-${index}` }
            >
              {itemCart.name}
            </td>
            <td
              data-testid={ `${page}__element-order-table-quantity-${index}` }
            >
              {itemCart.quantity}
            </td>
            <td>
              <span
                data-testid={
                  `${page}__element-order-table-unit-price-${index}`
                }
              >
                {`R$ ${(itemCart.price)
                  .toString()
                  .replace('.', ',')}`}
              </span>
            </td>
            <td>
              <span
                data-testid={
                  `${page}__element-order-table-sub-total-${index}`
                }
              >
                {`R$ ${(itemCart.price * itemCart.quantity)
                  .toFixed(2)
                  .toString()
                  .replace('.', ',')}`}
              </span>
            </td>
            {
              page === 'customer_checkout'
            && (
              <td>
                <button
                  name={ itemCart.id }
                  type="button"
                  data-testid={ `${page}__element-order-table-remove-${index}` }
                  onClick={ ({ target }) => removeItem(Number(target.name)) }
                >
                  Excluir
                  {' '}
                  <FaTrashAlt />
                </button>
              </td>
            )
            }
          </tr>
        ))}
      </tbody>
    </table>
  );
}

OrderTable.defaultProps = {
  removeItem: null,
};

OrderTable.propTypes = {
  productOrders: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  page: PropTypes.string.isRequired,
  removeItem: PropTypes.func,
};
