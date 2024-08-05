package com.example.backend.services;

import com.example.backend.models.*;
import com.example.backend.repositories.orderDetailRepository;
import com.example.backend.repositories.orderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class orderService {
    @Autowired
    orderRepository orderRepository;
    @Autowired
    orderDetailRepository orderDetailRepo;

    public List<OrderDisplayDTO> findCustomerOrders(Long custId) {
        List<Object[]> results = orderDetailRepo.findOrdersByCustomerId(custId);
        Map<Long, OrderDisplayDTO> ordersMap = new LinkedHashMap<>();

        for (Object[] result : results) {
            Long orderId = ((Number) result[0]).longValue();
            String restName = (String) result[1];
            float orderTotal = ((float) result[2]);
            String foodName = (String) result[4];
            int quantity = ((Number) result[5]).intValue();
            String suggestion = (String) result[6];

            OrderItemDTO item = new OrderItemDTO(foodName, quantity, suggestion);

            // Add items to corresponding orders, grouped by orderId
            if (!ordersMap.containsKey(orderId)) {
                List<OrderItemDTO> items = new ArrayList<>();
                items.add(item);
                OrderDisplayDTO orderDisplay = new OrderDisplayDTO(orderId, restName, orderTotal, items);
                ordersMap.put(orderId, orderDisplay);
            } else {
                OrderDisplayDTO existingOrder = ordersMap.get(orderId);
                existingOrder.getItems().add(item);
            }
        }

        // Convert the map values to a list for the final result
        return new ArrayList<>(ordersMap.values());
    }
    public Iterable<orderModel> selectAll() {
        return orderRepository.findAll();
    }

    public orderModel insertOne(orderModel orderModel) {
        return orderRepository.save(orderModel);
    }

    public List<OrderDisplayDTO> getOrdersByRestaurantId(Long restId) {
        List<Object[]> results = orderDetailRepo.findOrdersByRestaurantId(restId);
        return mapToOrderDisplayDTO(results);
    }

//    public List<orderModel> getOrdersByDeliveryId(Long dpId) {
//        return orderRepository.findByDpidOrderByOrderIdDesc(dpId);
//    }
public List<OrderDisplayDTO> getOrdersByDeliveryPartnerId(Long dpId) {
    List<Object[]> results = orderDetailRepo.findOrdersByDeliveryPartnerId(dpId);
    return mapToOrderDisplayDTO(results);
}

    private List<OrderDisplayDTO> mapToOrderDisplayDTO(List<Object[]> results) {
        List<OrderDisplayDTO> dtoList = new ArrayList<>();

        for (Object[] result : results) {
            // Correct type casting based on your query result set
            Long orderId = ((Number) result[0]).longValue();
            String restName = (String) result[1];
            float orderTotal = ((Number) result[2]).floatValue();
            Long foodId = ((Number) result[3]).longValue();  // Correctly cast Long
            String foodName = (String) result[4];
            int quantity = ((Number) result[5]).intValue();  // Cast Number to Integer
            String suggestion = (String) result[6];
            String customerName = (String) result[7];

            Long customerPhone = ((Number) result[8]).longValue();
            String customerAddress = (String) result[9];
            long deli_id = ((Number) result[10]).longValue();
            String status = (String) result[11];
            String location = (String) result[12];
            Long phone = ((Number) result[13]).longValue();
            String rest_add = (String) result[14];
            // Find if an existing OrderDisplayDTO for this orderId exists
            OrderDisplayDTO orderDisplayDTO = dtoList.stream()
                    .filter(dto -> dto.getOrderId().equals(orderId))
                    .findFirst()
                    .orElse(null);

            if (orderDisplayDTO == null) {
                // Create a new OrderDisplayDTO if it doesn't exist
                orderDisplayDTO = new OrderDisplayDTO();
                orderDisplayDTO.setOrderId(orderId);
                orderDisplayDTO.setRestName(restName);
                orderDisplayDTO.setOrderTotal(orderTotal);
                orderDisplayDTO.setItems(new ArrayList<>());
                orderDisplayDTO.setDelivery_id(deli_id);
                orderDisplayDTO.setStatus(status);
                orderDisplayDTO.setLocation(location);
                orderDisplayDTO.setCustPhone(phone);
                orderDisplayDTO.setRest_addr(rest_add);
                // Add customer details
                CustomerDTO customerDTO = new CustomerDTO();
                customerDTO.setCustomerName(customerName);
                customerDTO.setCustomerPhone(customerPhone);
                customerDTO.setCustomerAddress(customerAddress);

                orderDisplayDTO.setCustomer(customerDTO);
                dtoList.add(orderDisplayDTO);
            }

            // Add order items
            OrderItemDTO orderItemDTO = new OrderItemDTO();
            orderItemDTO.setFoodName(foodName);
            orderItemDTO.setQuantity(quantity);
            orderItemDTO.setSuggestion(suggestion);

            orderDisplayDTO.getItems().add(orderItemDTO);
        }
        return dtoList;
    }

//    public List<orderModel> getOrdersByCustomerId(Long custId) {
//        return orderRepository.findByCustIdOrderByOrderIdDesc(custId);
//    }

    public List<OrderDisplayDTO> getOrdersByCustomerId(Long dpId) {
        List<Object[]> results = orderDetailRepo.findOrdersByCustomerId(dpId);
        return mapToOrderDisplayDTO(results);
    }
//    //public void saveOrder(orderModel order) {
//        orderRepository.save(order);
//    }
public orderModel saveOrder(orderModel order) {
    return orderRepository.save(order);
}

    public void saveOrderDetail(OrderDetails orderDetail) {
        orderDetailRepo.save(orderDetail);
    }


    @Transactional
    public void updateOrderStatus(Long orderId, String status) {
        orderModel order = orderRepository.findById(orderId).orElse(null);

        if (order == null) {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }

        // Update the order status and delivery time
        order.setOrderStatus(status);
        orderRepository.save(order);
    }

    @Transactional
    public void updateOrderStatusAndTime(Long orderId, String status, Timestamp deliveryTime) {
        orderModel order = orderRepository.findById(orderId).orElse(null);

        if (order == null) {
            throw new RuntimeException("Order not found with ID: " + orderId);
        }

        // Update the order status and delivery time
        order.setOrderStatus(status);
        order.setDeliveryTime(deliveryTime);
        orderRepository.save(order);
    }
    public Iterable<orderModel> getAllOrders() {
        return orderRepository.findAll();
    }
    
}
