package com.example.backend.services;

import com.example.backend.models.*;
import com.example.backend.repositories.*;

import jakarta.servlet.http.HttpSession;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class restaurantService {
    @Autowired
    private restaurantRepository restaurant_Repository;


    @Autowired
    private orderDetailRepository order_detail;
    @Autowired
    private restaurantmenuService restaurantmenu_Service;
    
    @Autowired
    private itemService item_Service;
    
    @Autowired
    private orderService order_Service; 
    
    @Autowired
    private restaurantmenuRepository restaurantmenu_Repository;
    @Autowired
    private orderRepository order_repo;
    
    @Autowired
    private itemRepository item_Repository;// Ensure this is correctly autowired

    
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    public List<restaurantModel> getAllRestaurants() {
        return (List<restaurantModel>) restaurant_Repository.findAll();
    }

    public restaurantModel saveRestaurant(restaurantModel restaurant) {
        restaurant.setRestPswd(passwordEncoder.encode(restaurant.getRestPswd()));
        return restaurant_Repository.save(restaurant);
    }

    public restaurantModel getRestaurantById(Long id) {
        Optional<restaurantModel> customerOptional = restaurant_Repository.findById(id);
        return customerOptional.orElse(null);
    }

    public restaurantModel updateRestaurant(restaurantModel restaurant) {
        return restaurant_Repository.save(restaurant);
    }

    public void deleteRestaurant(Long id) {
        restaurant_Repository.deleteById(id);
    }

    public boolean validateLogin(String email, String pass) {
        restaurantModel acc = findByMail(email);
        return acc != null && passwordEncoder.matches(pass, acc.getRestPswd());
    }

    public restaurantModel findByMail(String email) {
        return restaurant_Repository.findByRestMail(email);
    }

    public restaurantModel findByEmailAndPassword(String email, String password) {
        return restaurant_Repository.findByRestMailAndRestPswd(email, password);
    }

    private List<Map<String, Object>> searchByFoodName(String foodName) {
        itemModel item = item_Repository.findByfoodName(foodName).orElse(null);
        if (item == null) {
            return null; // or throw an exception
        }

        List<restaurantmenuModel> menuItems = restaurantmenu_Repository.findByFoodId(item.getFoodId());

        return menuItems.stream().map(menuItem -> {
            Map<String, Object> itemDetails = new HashMap<>();
            itemDetails.put("foodName", item.getFoodName());
            itemDetails.put("foodPrice", menuItem.getFoodPrice());
            itemDetails.put("restaurantId", menuItem.getRestId());
            return itemDetails;
        }).collect(Collectors.toList());
    }

    public List<OrderDisplayDTO> findRestaurantOrders(Long restId) {
        return order_Service.getOrdersByRestaurantId(restId);
    }

    public void shipped(HttpSession session, Long orderId) {
        Long restId = (Long) session.getAttribute("restId");

        if (restId == null) {
            throw new RuntimeException("Delivery partner ID not found in session.");
        }

        orderModel order = order_repo.findById(orderId).orElse(null);

        if(order==null){
            throw new RuntimeException("Order not found with ID: " + restId);
        }
        restaurantModel rest = restaurant_Repository.findById(restId).orElse(null);

        if (rest == null) {
            throw new RuntimeException("Delivery partner not found with ID: " + restId);
        }
        
        //order.setOrderStatus("Shipped");
        //rest.setDpavailable(true); // Set the delivery partner as available
        //deliverypartnerRepository.save(dp); // Save the updated delivery partner

        // Update the order status to "Delivered"
        order_Service.updateOrderStatus(orderId, "Shipped");
        //payment.createPayment(orderId);
    }
    
}
